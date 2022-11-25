//Importo Fs + Path + bcrypt + Sharp * Express-validator
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const sharp = require('sharp');
const { validationResult } = require('express-validator');
const userService = require('../service/userService');

//Importo Modelo
const db = require('../database/models');

//CONTROLADOR
const controlador = {

    //Vista Registro
    register: (req, res) => {
        return res.render('users/form-crear-usuario')
    },

    //Guardado Registro
    newUser: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            userService.newUser(req.body, req.file)
                .then(() => {res.redirect('ingresa')})
                .catch((err) => {console.log(`${'No se pudo cargar a usuario '}${err}`)});
        }else{
            res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }   
    },

    //Vista editar
    edit: async (req, res) =>{
       let user = await userService.userByPk(req.params.id);
       res.render('users/form-editar-usuario', {usuario:  user})
    },

    //Edición
    update: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            //Busco al usuario para borrar la img
            db.User.findByPk(req.params.id)
                .then((user) => {
                    let avatarToDelete = path.join(__dirname, '../../public/imagenes/img-users/') + user.avatar;
                    fs.existsSync(avatarToDelete) ? fs.unlinkSync(avatarToDelete) : null;   
                }).catch((err) => {
                    res.send(`${'Usuario no existe'}${err}`);
                })
            
            //Sharp
            let fileName = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
            await sharp(req.file.buffer).resize(500, 500).jpeg({quality : 50, chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-users/')}${fileName}`);
            
            db.User.update({
                username: req.body.nombre,
                email: req.body.email,
                birth_day: req.body.fechanacimiento,
                address: req.body.domicilio,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: fileName
            },{
                where: {id: req.params.id}
            })
                .then(() => {
                    return res.redirect('/users/profile');
                })
        }else{
            db.User.findByPk(req.params.id)
                .then((user) => {
                    return res.render('users/form-editar-usuario', {usuario: user, errors: errors.mapped(), oldData: req.body})
                }).catch((err => {
                    res.send(`${'Usuario no existe'}${err}`);
                }));
        }
    },
    //Eliminar usuario
    delete: (req, res) => {

        db.User.findByPk(req.params.id)
            .then((user) => {
                let avatarToDelete = path.join(__dirname, '../../public/imagenes/img-users/') + user.avatar;
                fs.existsSync(avatarToDelete) ? fs.unlinkSync(avatarToDelete) : null; 
            }).catch((err) => {
                res.send(`${'Usuario no existe'}${err}`);
            });
        
        setTimeout(() => {
            db.User.destroy({
                where: {id : req.params.id}
            })
                .then(() => {
                    req.session.destroy();
                    res.clearCookie('remember');
                    return res.redirect('/')      
                });

        }, '3000')

    },

    //Login
    login: (req, res) => {
        res.render('users/ingresa')
    },
    processLogin: (req, res) => {
      
        let errors = validationResult(req)
        if (errors.isEmpty()) {

            db.User.findOne({where: {email: req.body.email}})
                .then((userToLogin) =>{
                    if ((bcryptjs.compareSync(req.body.password, userToLogin.password))){          
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;
                        if (req.body.remember) {
                            res.cookie('remember', userToLogin.email, {maxAge: (1000 * 60) * 60});
                        }
                        res.redirect('/users/profile')      
                    }else{
                        res.render('users/ingresa', {errors:{email:{msg: 'Credenciales inválidas'}}});
                    }
                })
                .catch(() => {
                    return res.render('users/ingresa', {errors:{email:{msg: 'Credenciales inválidas'}}});
                })       
        }else{
            return res.render('users/ingresa', {errors: errors.mapped()});
        }
    }, 
    //profile
    profile: (req, res) => {
        db.User.findOne({
            where: {email: req.session.userLogged.email}
        })
            .then((user) => {
                return res.render('users/profile', {user});
            })
    },
    //Logout
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/');
    }
};

module.exports = controlador;
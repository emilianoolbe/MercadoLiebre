//Importo Fs + Path + bcrypt + Sharp * Express-validator
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const sharp = require('sharp');
const { validationResult } = require('express-validator');

//Importo Modelo
const db = require('../database/models');

//CONTROLADOR
const controlador = {

    //Ruta img-users
    fileNameAvatar:path.join(__dirname, '../../public/imagenes/img-users/'),

    //Vista Registro
    register: (req, res) => {
        return res.render('users/form-crear-usuario')
    },

    //Guardado Registro
    newUser: async (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){

            let fileName = `${'user-'}${Date.now()} ${path.extname(req.file.originalname)}`;
            await sharp(req.file.buffer).resize(500, 500).jpeg({quality : 50, chromaSubsampling: '4:4:4'}).toFile(`${this.fileNameAvatar}${fileName}`);

            db.User.create({
                username: req.body.nombre,
                email: req.body.email,
                birth_day: req.body.fechanacimiento,
                address: req.body.domicilio,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: fileName
            })
            .then(() => {
                return res.redirect('ingresa')
            });
        }else{
            return res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }   
    },

    //Vista editar
    edit: (req, res) =>{
        db.User.findByPk(req.params.id)
            .then((usuario) => {
                res.render('users/form-editar-usuario', {usuario:  usuario})
            }).catch((err) => {
                res.send(`${'Usuario no existe'}${err}`);
            })
    },

    //Edición
    update: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            //Busco al usuario para borrar la img
            db.User.findByPk(req.params.id)
                .then((user) => {
                    let avatarToDelete = `${this.fileNameAvatar}${user.avatar}`
                    fs.existsSync(avatarToDelete) ? fs.unlinkSync(avatarToDelete) : null;   
                }).catch((err) => {
                    res.send(`${'Usuario no existe'}${err}`);
                })
            
            //Sharp
            let fileName = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
            await sharp(req.file.buffer).resize(500, 500).jpeg({quality : 50, chromaSubsampling: '4:4:4'}).toFile(`${this.fileNameAvatar}${fileName}`);
            
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
                    return res.redirect('profile');
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
                let imgToDelete = `${this.fileNameAvatar}${user.avatar}`
                fs.existsSync(imgToDelete) ? fs.unlinkSync(imgToDelete) : null; 
            }).catch((err) => {
                res.send(`${'Usuario no existe'}${err}`);
            })

        db.User.destroy({
            where: {id : req.params.id}
        })
            .then(() => {
                return res.redirect('/')      
            });
    },

    //Login
    login: (req, res) => {
        res.render('users/ingresa')
    },
    processLogin: (req, res) => {
      
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            User.findOne({where: {email: req.body.email}})
                .then((userToLogin) =>{
                    if (userToLogin == undefined || !(bcryptjs.compareSync(req.body.password, userToLogin.password))){
                        return res.render('users/ingresa', {errors:{email:{msg: 'Email o contraseña inválidos'}}});
                        
                    }else{
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;
                        if (req.body.remember) {
                            res.cookie('remember', userToLogin.email, {maxAge: (1000 * 60) * 60});
                        }
                        return res.redirect('profile');
                    }
                });       
        }else{
            return res.render('users/ingresa', {errors: errors.mapped()});
        }
    }, 
    //profile
    profile: (req, res) => {
        return res.render('users/profile', {user : req.session.userLogged})
    },
    //Logout
    logout: (req, res) => {
        res.clearCookie('remember');
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = controlador;
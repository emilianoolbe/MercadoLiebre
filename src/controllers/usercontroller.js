//Importo Fs + Path + bcrypt + Sharp
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const sharp = require('sharp');

//Importo Modelo
const User = require('../models/Users');

//Importo ResultValidation
const { validationResult } = require('express-validator');
const path = require('path');

//CONTROLADOR
const controlador = {

    //Detalle Usuarios

    allUsers: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));
        return res.render('users/usuarios' , {usuarios : usuarios});
    },

    //Vista form Registro
    register: (req, res) => {
        return res.render('users/form-crear-usuario')
    },

    //Guardado Registro
    newUser: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            let imgSharp = sharp(req.file.buffer).resize(500, 500).jpeg({quality : 50, chromaSubsampling: '4:4:4'}).toFile(User.fileNameImg + 'user-' + Date.now() + path.extname(file.originalname));

            let newUser = {
                ...req.body,
                password : bcryptjs.hashSync(req.body.password, 10),
                password2: bcryptjs.hashSync(req.body.password2, 10),
                img: imgSharp
            };
            User.createNewUser(newUser);
            return res.redirect('ingresa')
        }else{
            return res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }   
    },

    //Vista form editar
    edit: (req, res) =>{
        User.findUserbyPk(req.params.id) ? res.render('users/form-editar-usuario', {usuario: User.findUserbyPk(req.params.id) }) : res.send('Usuario no existe'); 
    },

    //Edición
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let userToUpdate = User.findUserbyPk(req.params.id);
            fs.unlinkSync(User.fileNameImg + userToUpdate.img);

            let imgSharp = sharp(req.file.buffer).resize(500, 500).jpeg({quality : 50, chromaSubsampling: '4:4:4'}).toFile(User.fileNameImg + 'user-' + Date.now() + path.extname(file.originalname));
            userToUpdate = {
                img: imgSharp,
                password: bcryptjs.hashSync(req.body.password, 10),
                password2: bcryptjs.hashSync(req.body.password2, 10),
                ...req.body
            };
            User.updateAUser(req.params.id, userToUpdate);
            return res.render('users/profile', {user: userToUpdate})
        }else{
            return User.findUserbyPk(req.params.id) ? res.render('users/form-editar-usuario', {usuario: User.findUserbyPk(req.params.id), errors: errors.mapped(), oldData: req.body}) : res.send('Usuario no encontrado'); 
        }
    },
    //Eliminar usuario
    delete: (req, res) => {

        let usuarioEncontrado = User.findUserbyPk(req.params.id);
        console.log(usuarioEncontrado);
        let imgABorrar = User.fileNameImg + usuarioEncontrado.img;
        fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;
        User.delete(req.params.id)
        return res.redirect('/')      
    },

     //Login
     login: (req, res) => {
        res.render('users/ingresa')
    },

    processLogin: (req, res) => {
      
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let userToLogin = User.findUserByField('email', req.body.email)

            if (userToLogin == undefined || !(bcryptjs.compareSync(req.body.password, userToLogin.password))){
                
                return res.render('users/ingresa', {errors:{email:{msg: 'Email o contraseña inválidos'}}})
                
            }else{
                delete userToLogin.password;
                delete userToLogin.password2;
                req.session.userLogged = userToLogin;
                if (req.body.remember) {
                    res.cookie('remember', userToLogin.email, {maxAge: (1000 * 60) * 60});
                }
                return res.redirect('profile');
            }
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
//Importo Fs + Path + bcrypt
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

//Importo Modelo
const User = require('../models/Users');

//Importo ResultValidation
const { validationResult } = require('express-validator');

//CONTROLADOR
const controlador = {

    //Detalle Usuarios

    allUsers: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));
        return res.render('/users/usuarios' , {usuarios : usuarios});
    },

    //Vista form Registro
    register: (req, res) => {
        return res.render('users/form-crear-usuario')
    },

    //Guardado Registro
    newUser: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            let newUser = {
                ...req.body,
                password : bcryptjs.hashSync(req.body.password, 10),
                img: req.file.filename
            };
            User.createNewUser(newUser);
            return res.redirect('/users/ingresa')
        }else{
            return res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }
        
    },

    //Vista form editar
    edit: (req, res) =>{
        
        User.findUserbyPk(req.params.id) ? res.render('./users/form-editar-usuario', {usuario: usuarioEncontrado}) : res.send('Usuario no existe'); 
    },

    //Edición
    update: (req, res) => {
        
        let usuarioEncontrado = User.findUserbyPk(req.params.id);
        fs.unlinkSync(path.join(User.fileNameImg) + usuarioEncontrado.img);
        User.updateAUser(req.params.id, req.body);
        return res.redirect('/profile')
    },

    //Eliminar usuario

    delete: (req, res) => {

        let usuarioEncontrado = User.findUserbyPk(req.params.id);
        console.log(usuarioEncontrado);
        let imgABorrar = path.join(User.fileNameImg) + usuarioEncontrado.img;
        fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;
        User.delete(req.params.id)
        return res.redirect('/')
        
    },

     //Login
     login: (req, res) => {
        res.render('users/ingresa')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);       
        if (errors.isEmpty()) {

            let usuarioALoguearse = User.findUserByField('email', req.body.email); 
            let passwordOk = bcryptjs.compareSync(req.body.password, usuarioALoguearse.password);
            console.log(passwordOk);
            if (bcryptjs.compareSync(req.body.password, usuarioALoguearse.password)) { 
                delete usuarioALoguearse.password;            
                req.session.userLogged = usuarioALoguearse;

                if(req.body.remember != undefined){
                    res.cookie('remember', req.session.userLogged.email, {maxAge: ((1000 * 60) * 60)});
                }
                return res.redirect('/profile')

            }else{
                res.render('users/ingresa', {errors: {email: {msg: 'Credenciales inválidas'}}}) 
            }
            //Busco si el mail se encuentra en database
            //Si lo encuentra comparo contraseñas (envío mensaje de error si no coinciden)
            //Elimino el password para no guardarlo en session

        }else{
            res.render('users/ingresa', { errors: errors.mapped() });
        }
    }

};

module.exports = controlador;
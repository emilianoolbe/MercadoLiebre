//Importo bcrypt + Sharp * Express-validator

const bcryptjs = require('bcryptjs');
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
    newUser: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            await userService.newUser(req.body, req.file);
            res.redirect('ingresa')
        }else{
            res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }   
    },
    //Vista editar
    edit: async (req, res) =>{
       let user = await userService.userByPk(req.params.id);
       res.render('users/form-editar-usuario', {usuario:  user});
    },
    //Edición
    update: async (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            await userService.deteleteAvatar(req.params.id);
            await userService.updateUser(req.params.id, req.file, req.body);
            res.redirect('/');
        }else{
            let user = await userService.userByPk(req.params.id)
            res.render('users/form-editar-usuario', {usuario: user, errors: errors.mapped(), oldData: req.body});   
        }
    },
    //Eliminar usuario
    delete: async (req, res) => {      
        await userService.deteleUser(req, res);
        res.redirect('/'); 
    },  
    //Restaurar usuario
    restoreUserView: (res) => {
        res.render('users/recuperar-usuario');
    },
    restoreUser: async (req, res) => {
        let errors = validationResult(req);
        
        let userToRecover = await userService.restoreUser(req)
        console.log(userToRecover);
        res.render('users/ingresa')
     
        res.render('users/ingresa', {errors:{email:{msg: 'Credenciales inválidas'}}});
        
    },
    //Login
    login: (res) => {
        res.render('users/ingresa')
    },

    processLogin: async(req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let userToLogin = await userService.login(req, res);
            userToLogin ? res.redirect('profile') :  res.render('users/ingresa', {errors:{email:{msg: 'Credenciales inválidas'}}});
        }else{
            res.render('users/ingresa', {errors: errors.mapped()});
        }
    }, 
    //profile
    profile: async (req, res) => {
        let user = await userService.userInSession(req)
        res.render('users/profile', {user});  
    },
    //Logout
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/');
    }
};

module.exports = controlador;
//Importo servicios + Express-validator

const { validationResult } = require('express-validator');
const userService = require('../service/userService');
const productService = require('../service/productsService');

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
            await userService.newUser(req.body, req.file) ?  res.redirect('ingresa') : res.render('users/form-crear-usuario', {errors:{email:{msg: '¡Este email ya esta registrado!'}}, oldData: req.body}); 
        }else{
            res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }; 
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
    restoreUserView: (req, res) => {
        res.render('users/recuperar-usuario');
    },
    restoreUser: async (req, res) => {
        await userService.restoreUser(req) ? res.render('users/ingresa') : res.render('users/recuperar-usuario', {errors:{email:{msg: 'Credenciales inválidas'}}});
    },
    //Login
    login: (req, res) => {
        res.render('users/ingresa');
    },
    processLogin: async(req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            await userService.login(req, res) ? res.redirect('profile') :  res.render('users/ingresa', {errors:{email:{msg: 'Credenciales inválidas'}}});
        }else{
            res.render('users/ingresa', {errors: errors.mapped()});
        };
    }, 
    //profile
    profile: async (req, res) => {
        let user = await userService.userInSession(req);
        res.render('users/profile', {user});  
    },
    //Logout
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/');
    },
    //Products For user
    myProductView: async (req, res) => {
        const products = await productService.getProducts();
        res.render('users/products', {products});
    }   
};

module.exports = controlador;
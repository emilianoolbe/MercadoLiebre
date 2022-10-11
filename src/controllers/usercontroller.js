//Importo Fs + Path + bcrypt
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

//Importo Modelo
const User = require('../models/Users');

//Importo ResultValidation
const { validationResult } = require('express-validator');

//Leo usuariosJSON
let userJsonPath = path.join(__dirname, '../dataBase/users.json');
let usuarios = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

//CONTROLADOR
const controlador = {

    //Detalle Usuarios

    allUsers: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));
        res.render('/users/usuarios' , {usuarios : usuarios});
    },

    //Vista form Registro
    register: (req, res) => {
        res.render('users/form-crear-usuario')
    },

    //Guardado Registro
    newUser: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let usuarioNuevo = {
                'id' : (usuarios[usuarios.length - 1].id) + 1,
                'nombre': req.body.nombre,
                'email': req.body.email,
                'fechanacimiento' : req.body.fechanacimiento,
                'domicilio' : req.body.domicilio,
                'tipotransaccion' : req.body.tipotransaccion,
                'interes' : req.body.interes,
                'img' : req.file.filename,
                'password' : bcryptjs.hashSync(toString(req.body.password), 12)
            }
    
            //Guardado lógico
            usuarios.push(usuarioNuevo);
            //Guardado físico
            fs.writeFileSync(userJsonPath, JSON.stringify(usuarios, null, 4) , 'utf-8');

            res.redirect('/users/ingresa')

        }else{
            res.render('users/form-crear-usuario', {errors: errors.mapped(), oldData: req.body});
        }
        
    },

    //Vista form editar
    edit: (req, res) =>{
        let usuarioEncontrado = usuarios.find((cadaElemento) => cadaElemento.id == req.params.id)

        usuarioEncontrado ? res.render('/users/register-edit-form', {usuario: usuarioEncontrado}) : res.send('Usuario no existe'); 
    },

    //Edición
    update: (req, res) => {
        
        let imagenAntigua;
        for (let cadaElemento of usuarios){
            if(cadaElemento.id == req.params.id){
                imagenAntigua = cadaElemento.img;
                cadaElemento.nombre = req.body.nombre;
                cadaElemento.email = req.body.email;
                cadaElemento.fechanacimiento = req.body.fechanacimiento;
                cadaElemento.domicilio = req.body.domicilio;
                cadaElemento.tipotransaccion = req.body.tipotransaccion;
                cadaElemento.interes = req.body.interes;
                cadaElemento.img = req.file.filename;
                cadaElemento.password = bcryptjs.hashSync(toString(req.body.password), 12);
            }
        }
        fs.unlinkSync(path.join(__dirname, '../../public/imagenes/img-users/') + imagenAntigua);
        fs.writeFileSync(userJsonPath, JSON.stringify(usuarios, null, 4) , 'utf-8');

    },

    //Eliminar usuario

    delete: (req, res) => {

        let usuarioAborrar = usuarios.find((cadaElemento) => cadaElemento.id == req.params.id);
        let imgABorrar = path.join(__dirname, '../../public/imagenes/img-users') + usuarioAborrar.img;

        fs.existsSync(imgABorrar) ? fs.unlinkSync(imgABorrar) : null;

        let usuariosActualizados = usuarios.filter((cadaElemento) => cadaElemento.id != req.params.id);

        fs.writeFileSync(userJsonPath, JSON.stringify(usuariosActualizados, null, 4) , 'utf-8');

        res.redirect('/users/usuarios');
    },

     //Login
     login: (req, res) => {
        res.render('users/ingresa')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);       
        if (errors.isEmpty()) {

            let userToLogin = User.findUserByField('email', req.body.email); 
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            console.log(passwordOk);
            if (bcrypt.compareSync(req.body.password, userToLogin.password)) { 
                delete userToLogin.password;            
                req.session.userLogged = userToLogin;
                return res.send('Estas en sesión')
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
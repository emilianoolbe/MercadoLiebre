//Importo Fs
const fs = require('fs');

//Importo Path
const path = require('path');

//Leo usuariosJSON
let userJsonPath = path.join(__dirname, '../dataBase/users.json');
let usuarios = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

//CONTROLADOR
const controlador = {

    //Vista Login
    login: (req, res) => {
        res.render('users/ingresa')
    },

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

        let usuarioNuevo = {
            "id" : (usuarios[usuarios.length - 1].id) + 1,
            'nombre': req.body.nombre,
            'usuario': req.body.usuario,
            'fechanacimiento' : req.body.fechanacimiento,
            'domicilio' : req.body.domicilio,
            'tipotransaccion' : req.body.tipotransaccion,
            'interes' : req.body.interes,
            'img' : req.file.filename,
            'password' : req.body.password
        }
        console.log(usuarioNuevo);
        //Guardado lógico
        usuarios.push(usuarioNuevo);
        //Guardadi físico
        fs.writeFileSync(userJsonPath, JSON.stringify(usuarios, null, 4) , 'utf-8');

        res.redirect('/users/ingresa')
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
                cadaElemento.usuario = req.body.usuario;
                cadaElemento.fechanacimiento = req.body.fechanacimiento;
                cadaElemento.domicilio = req.body.domicilio;
                cadaElemento.tipotransaccion = req.body.tipotransaccion;
                cadaElemento.interes = req.body.interes;
                cadaElemento.img = req.file.filename;
                cadaElemento.password = req.body.password;
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
    }
};

module.exports = controlador;
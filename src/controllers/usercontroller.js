//CONTROLADOR
const controlador = {
    login: (req, res) => {
        res.render("users/ingresa")
    },
    register: (req, res) => {
        res.render('users/register')
    },
    edit: (req, res) => {
        let usuarioaEditar;
        for (cadaElemento of users){
            if (cadaElemento.id == req.params.id){
                usuarioaEditar = cadaElemento;
            }
        }
        res.render('vistaFormularioQueEdita', {usuarioaEditar: usuarioaEditar})
    },
    update: (req, res) =>{

        res.redirect('/');
    },
    detele: (req,res) =>{
        users = users.filter((cadaElemento) =>{cadaElemento != req.params.id})
        res.redirect('/');
    },
};

module.exports = controlador;
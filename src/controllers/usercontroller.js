//CONTROLADOR
const controlador = {
    login: (req, res) => {
        res.render('users/ingresa')
    },
    register: (req, res) => {
        res.render('users/register')
    }
};

module.exports = controlador;
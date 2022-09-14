const controlador = {
    login: (req, res) => {
        res.render("ingresa")
    },
    register: (req, res) => {
        res.render('register')
    }
};

module.exports = controlador;
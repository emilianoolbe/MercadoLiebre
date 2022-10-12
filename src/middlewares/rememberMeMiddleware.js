//Importo Modelo
const User = require('../models/Users');

function rememberMeMiddleware(req, res, next){

    if (req.cookies.remember != undefined && req.session.userLogged == undefined) {
        let usuarioALoguearse = User.findUserByField('email', req.cookies.remember)
        req.session.userLogged = usuarioALoguearse;
    }
    next();
}

module.exports = rememberMeMiddleware;
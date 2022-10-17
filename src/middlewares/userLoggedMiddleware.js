//Modelo
const User  = require('../models/Users' );

function userLoggedMiddleware(req, res, next) {

    let userInCookie = User.findUserByField('email', req.cookies.remember);
    if (userInCookie){
        delete userInCookie.password;
        delete userInCookie.password2;
        req.session.userLogged = userInCookie
    }
    res.locals.isLogged = false;

    if (req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }
    next();
}

module.exports = userLoggedMiddleware;
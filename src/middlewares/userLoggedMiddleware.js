//Modelo
const db  = require('../database/models' );
async function userLoggedMiddleware(req, res, next) {

    res.locals.isLogged = false;
    let userInCookie;
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }else{
        if (req.cookies.remember) {
            userInCookie = await db.User.findOne({where: {email: req.cookies.remember}})
        };
        if (userInCookie) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged = userInCookie;
        };
    };
    next();
};
module.exports = userLoggedMiddleware;
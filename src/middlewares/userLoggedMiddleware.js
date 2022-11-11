//Modelo
const db  = require('../database/models' );

function userLoggedMiddleware(req, res, next) {

    if (req.cookies.remember) {
        
        db.User.findOne({where: {email: req.cookies.remember}})
            .then((userInCookie) => {
                if (userInCookie){
                    delete userInCookie.password;
                    req.session.userLogged = userInCookie
                }
            }).catch(() => {
                console.log('No hay email')
            });
    }

    res.locals.isLogged = false;
    if (req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }
    next();
}

module.exports = userLoggedMiddleware;
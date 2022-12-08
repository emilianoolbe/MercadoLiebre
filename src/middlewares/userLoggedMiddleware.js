//Modelo
const db  = require('../database/models' );

function userLoggedMiddleware(req, res, next) {

    if (req.cookies.remember && req.session.userLogged == undefined) {
        
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
        db.User.findOne({where: {email: req.session.userLogged.email}})
            .then((user)=> {
                res.locals.isLogged = true;
                res.locals.userLogged = user;
            })
    }
    next();
};

module.exports = userLoggedMiddleware;
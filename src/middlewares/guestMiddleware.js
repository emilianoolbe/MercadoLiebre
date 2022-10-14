function guestMiddleware (req, res, next){

    if (req.session.userToLogged){
     
    }

    next();
};

module.esprts = guestMiddleware;
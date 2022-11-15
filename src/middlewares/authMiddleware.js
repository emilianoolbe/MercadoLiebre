function authMiddleware(req, res, next) {
    if (!req.session.userLogged){
        return res.redirect('/users/ingresa');
    }
    next();
}
module.exports = authMiddleware;
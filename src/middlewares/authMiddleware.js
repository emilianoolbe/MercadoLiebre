function authMiddleware(req, res, next) {
    if (!req.session.usuarioLogueado){
        return res.redirect('/users/ingresa');
    }
    next();
}
module.exports = authMiddleware;
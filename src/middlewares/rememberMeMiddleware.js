const user = require('../models/Users');
function rememberMeMiddleware(req, res, next) {
    
    if (req.cookies.remember != undefined && req.session.userLogged == undefined) {
        let userToLogin;
        let allUsers = user.findAllUsers();
        for(let eachElement of allUsers){
            if (eachElement.email == req.cookies.remember){
                 eachElement = userToLogin;
                 break;   
            }
        }
        req.session.userLogged = userToLogin;
        next();
    };
};
module.exports = rememberMeMiddleware;
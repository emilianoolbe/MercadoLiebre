//Importo File System + Path + Sharp + bcrptsjs + modelo
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

//Usuario nuevo
async function newUser(data, file) {
    let user = await db.User.findOne({where: {email: data.email}});
    if (!user) {
        let avatar = `${'user-'}${Date.now()}${path.extname(file.originalname)}`;
        await sharp(file.buffer).resize(500, 500).jpeg({quality: 50 , chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-users/')}${avatar}`);
        return await db.User.create({
            username: data.nombre,
            email: data.email,
            birth_day: data.fechanacimiento,
            address: data.domicilio,
            password: bcryptjs.hashSync(data.password, 10),
            avatar: avatar 
        });
    };
};
//Usuario por ID
async function userByPk(id) {
    return await db.User.findByPk(id);
};
//Borrado avatar de usuario
async function deteleteAvatar(id) {
    return await db.User.findByPk(id)
        .then((user) => {
            let avatarToDelete = path.join(__dirname, '../../public/imagenes/img-users/') + user.avatar;
            fs.existsSync(avatarToDelete) ? fs.unlinkSync(avatarToDelete) : null;   
        }).catch((err) => {
            res.send(`${'Usuario no existe'}${err}`);
        });
};
//Actualizar usuario
async function updateUser(userId, file, data ) {

    let avatar = `${'user-'}${Date.now()}${path.extname(file.originalname)}`;
    await sharp(file.buffer).resize(500, 500).jpeg({quality: 50 , chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-users/')}${avatar}`);
    
    return await db.User.update({
        username: data.nombre,
        email:data.email,
        birth_day: data.fechanacimiento,
        address: data.domicilio,
        password: bcryptjs.hashSync(data.password, 10),
        avatar: avatar
    },{
        where: {id: userId}
    })
};
//Borrado de usuario
function deteleUser(req, res) {
    return db.User.destroy({
        where: {id: req.params.id}
    })
        .then(() => {
            req.session.destroy();
            res.clearCookie('remember');
        })
};
async function restoreUser(req) {
    let user = await db.User.findOne({where: {email: req.body.email}, paranoid: false})
    if (user && bcryptjs.compareSync(req.body.password, user.password)) {
        db.User.restore({ where: { id: user.id}});
    return user
    };
};
//Proceso de logueo
async function login(req, res) {
    let user =  await db.User.findOne({where: {email: req.body.email}})
    if (user && bcryptjs.compareSync(req.body.password, user.password)) {
        delete user.password;
        if (req.body.remember) {
            res.cookie('remember', user.email, {maxAge: (1000 * 60) * 60});       
        };     
    return req.session.userLogged = user;
    };
};

async function userInSession(req ) {
    return await db.User.findOne({where: {email: req.session.userLogged.email}});
};
module.exports = {newUser, userByPk, deteleteAvatar, updateUser, deteleUser, login, userInSession, restoreUser};
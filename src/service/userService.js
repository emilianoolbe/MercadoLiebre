//Importo File System + Path + Sharp + bcrptsjs + modelo
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

async function newUser(data, file) {
    //sharp
    let avatar = `${'user-'}${Date.now()}${path.extname(file.originalname)}`;
    await sharp(file.buffer).resize(500, 500).jpeg({quality: 50 , chromaSubsampling: '4:4:4'}).toFile(`${path.join(__dirname, '../../public/imagenes/img-users/')}${avatar}`);

    return await db.User.create({
        username: data.nombre,
        email: data.email,
        birth_day: data.fechanacimiento,
        address: data.domicilio,
        password: bcryptjs.hashSync(data.password, 10),
        avatar: avatar 
    })
};

async function userByPk(id) {
    return await db.User.findByPk(id);
}


module.exports = {newUser, userByPk};
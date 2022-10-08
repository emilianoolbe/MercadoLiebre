//Importo fs - path
const fs = require('fs');
const path = require('path');

const User = {

    //Ruta absoluta de JSON
    fileName: path.join(__dirname, '../dataBase/users.json'),

    //Parseo + lectura de JSON
    getData: () => { return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); },

    //Todos los usuarios
    findAllUsers: () => { return this.getData(); },

    //Busqueda por ID
    findUserbyPk : (id) => {
        let allUsers = this.findAllUsers();

        let userFound = allUsers.find((cadaElemento) => cadaElemento.id === id);

        return userFound;
     },

     //Busqueda por campo (email, pass, usuario...)
     findUserByFild: (field, text) => {
        let allUsers = this.findAllUsers();

        let userFound = allUsers.find((cadaElemento) => cadaElemento[field] === text);

        return userFound;
     },

     //Generación de ID

     generateId: () => { 
        let allUsers = this.findAllUsers(); 
        let lastUser = allUsers.pop();
        lastUser ? lastUser.id + 1 : 1;
    },

     //Creación usuario
     create: (userData) => {
        let allUsers = this.findAllUsers();

        let newUser = {
            id: this.generateId(),
            ...userData

        };
        allUsers.push(newUser);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null , 4));
        return true;
     }

}


module.exports = Product;
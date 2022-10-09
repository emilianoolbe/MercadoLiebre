//Importo fs - path
const fs = require('fs');
const path = require('path');

const User = {

    //Ruta absoluta de JSON
    fileName: path.join(__dirname, '../dataBase/users.json'),

    //Parseo + lectura de JSON
    getData: function () { return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); },

    //Todos los usuarios
    findAllUsers: function () { return this.getData(); },

    //Busqueda por ID
    findUserbyPk : function (id){
        let allUsers = this.findAllUsers();

        let userFound = allUsers.find((cadaElemento) => cadaElemento.id == id);

        return userFound;
     },

     //Busqueda por campo (email, pass, usuario...)
     findUserByFild: function (field, text){
        let allUsers = this.findAllUsers();

        let userFound = allUsers.find((cadaElemento) => cadaElemento[field] == text);

        return userFound;
     },

     //Generación de ID

     generateId: function () { 
        let allUsers = this.findAllUsers(); 
        let lastUser = allUsers.pop();
        return lastUser ? lastUser.id + 1 : 1;
    },

     //Creación usuario
     create: function (userData) {
        let allUsers = this.findAllUsers();

        let newUser = {
            id: this.generateId(),
            ...userData
        };

        allUsers.push(newUser);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null , 4));
        return true;
     },

     //Elimiación de usuario
     delete: function (id) {
      let allUsers = this.findAllUsers();
      let finalUsers = allUsers.filter((cadaElemento) => cadaElemento.id != id);
      fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, 4), 'utf-8');
      return true;
     },

     //Edición de usuario
     update: function(id,userData){
      let allUsers = this.findAllUsers();
      for (cadaElemento of allUsers) {
         if(cadaElemento.id == id){
            let updateUser = {
               id : this.generateId(),
               ...userData,
            }
         }
         return updateUser;
      }
      allUsers.push(updateUser);

     }

}

console.log(User.findUserByFild('id', 1));

module.exports = User;
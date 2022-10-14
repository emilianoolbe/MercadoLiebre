//Importo fs - path
const fs = require('fs');
const path = require('path');

const User = {

    //Ruta absoluta de JSON
    fileName: path.join(__dirname, '../dataBase/users.json'),

    //Ruta absoluta img
    fileNameImg: path.join(__dirname, '../../public/imagenes/img-users/'),

    //Parseo + lectura de JSON
    getData: function () { return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); },

    //Todos los usuarios
    findAllUsers: function () { return this.getData(); },

    //Busqueda por ID
    findUserbyPk : function (id){
        let allUsers = this.findAllUsers();
        let userFound = allUsers.find((eachElement) => eachElement.id == id);
        
        return userFound;
     },

     //Busqueda por campo (email, pass, usuario...)
     findUserByField: function (field, text){
        let allUsers = this.findAllUsers();
        let userFound = allUsers.find((eachElement) => eachElement[field] == text);

        return userFound;
     },

     //Generación de ID

     generateId: function () { 
        let allUsers = this.findAllUsers(); 
        let lastUser = allUsers.pop();

        return lastUser ? lastUser.id + 1 : 1;
    },

     //Creación usuario
     createNewUser: function (userData) {
        let allUsers = this.findAllUsers();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allUsers.push(newUser);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null , 4), 'utf-8');
        return newUser;
     },

     //Elimiación de usuario
     delete: function (id) {
      let allUsers = this.findAllUsers();
      let finalUsers = allUsers.filter((eachElement) => eachElement.id != id);

      fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, 4), 'utf-8');
      return finalUsers;
     },

     //Edición de usuario
     updateAUser: function(id, userData) {
      let allUsers = this.findAllUsers();
      for ( let i = 0; i < allUsers.length; i++ ){
         if (allUsers[i].id == id) {
            allUsers[i] = userData;
            allUsers[i].id = parseInt(id);
         };
      }
      fs.writeFileSync(this.fileName, JSON.stringify( allUsers, null, 4), 'utf-8');
      return true;
   },
   
      //ProcessLogin
   

   
};
module.exports = User;


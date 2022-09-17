//Importo express y path
const express = require ("express");
const path = require("path");

//Importo routes
const router = require("./routes/homeRouter");
const routerUser = require('./routes/userRouter'); 

// Ejecuto express
let app = express();

//Accediendo a recursos estáticos
app.use(express.static("./public"));

//Seteo de template Engine EJS
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');


//Rutas
app.use("/", router);
app.use("/user", routerUser);


//Levanto servidor
app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");});


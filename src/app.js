//Importo express y path
const express = require ("express");
const path = require("path");

//Importo routes
const router = require("./routes/homeRouter");
const routerUser = require('./routes/userRouter'); 

// Ejecuto express en variable app 
let app = express();
app.use(express.static(path.join(__dirname, "../public")));

//Lineas EJS
app.set('view engine', 'ejs');

//Detallo rutas
app.use("/", router);
app.use("/ingresa", routerUser);
app.use("/register", routerUser);


//Levanto servidor
app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");});


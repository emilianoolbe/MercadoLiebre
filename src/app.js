//Importo express y path
const express = require ("express");
const path = require("path");

//Importo enrutadores
const router = require("./routes/homeRouter");
const routerUser = require('./routes/userRouter');
const routerProducts = require('./routes/productsRouter');

// Ejecuto express
let app = express();

//Cambio a estatica a la carpeta public (para poder acceder)
app.use(express.static("./public"));

//Seteo de template Engine EJS
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

//Seteo métodos Post
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

//Rutas
app.use('/', router);
app.use('/users', routerUser);
app.use('/products', routerProducts);


//Levanto servidor
app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");});


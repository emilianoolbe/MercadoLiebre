//Importo express y path
const express = require ("express");
const path = require("path");

// Ejecuto express
let app = express();

//Importo enrutadores
const router = require("./routes/homeRouter");
const routerUser = require('./routes/userRouter');
const routerProducts = require('./routes/productsRouter');

//Importo Middlewares de aplicación
const session = require('express-session');

//Middlewares()
app.use(express.static("./public"));
app.use(session({secret: 'SECRET', resave : false, saveUninitialized: false }));



//Seteo de template Engine EJS
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

//Seteo métodos Post
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const methodOverride = require('method-override');
const { appendFile } = require("fs");
app.use(methodOverride('_method')); 

//Rutas
app.use('/', router);
app.use('/users', routerUser);
app.use('/products', routerProducts);


//Levanto servidor
app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");});


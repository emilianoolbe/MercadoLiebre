//Importo express y path + app = Express()
const express = require ("express");
const path = require("path");
let app = express();

//Importo enrutadores
const router = require("./routes/homeRouter");
const routerUser = require('./routes/userRouter');
const routerProducts = require('./routes/productsRouter');

//Seteo de template Engine EJS
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

// --> Middlewares de aplicación <--

//Seteo métodos POST PUT.. etc JSON
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

//Session
const session = require('express-session');
app.use(session({secret: 'SECRET', resave : false, saveUninitialized: false }));

//Cookies
const cookies = require('cookie-parser');
app.use(cookies());

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);
app.use(express.static("./public"));

//Rutas
app.use('/', router);
app.use('/users', routerUser);
app.use('/products', routerProducts);

//Error
const error404 = require('./middlewares/404ErrorMiddlleware');
app.use(error404);

//Levanto servidor
app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");});
    
    
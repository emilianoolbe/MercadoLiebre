const express = require ("express");
let app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

const router = require("./routes/homeRouter");
const routerLogin = require("./routes/loginRouter");
const routerRegister = require("./routes/registerRouter");

app.get("/", router);
app.get("/ingresa", routerLogin);
app.get("/register", routerRegister);


app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");});


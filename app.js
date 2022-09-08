const express = require ("express");

const path = require("path");

let app = express();

app.use(express.static(path.join(__dirname, "./public")));


app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/html/home.html"));
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/html/creatucuenta.html"));
})


app.get("/ingresa", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/html/ingresa.html"));
})

app.listen(process.env.PORT || 3010, function() {
    console.log("Servidor corriendo en el puerto 3010");
});
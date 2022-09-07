const express = require ("express");

const path = require("path");

let app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.listen(3010, () => console.log("Servidor Corriendo"));

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "./views/html/home.html"));
})

app.get("/creatucuenta", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/html/creatucuenta.html"));
})
app.get("/ingresa", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/html/ingresa.html"));
})
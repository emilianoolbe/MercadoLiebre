//Importo Multer
const multer = require('multer');

//Importo path
const path = require('path');

//Seteo multer (indico donde guardo file + nome)
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/imagenes/img-products'));
    },
    filename: (req, file, cb) =>{
        //creo el nombre de la imagen (concateno el string + fecha en ms + extensión original)
        let nuevaImg = 'products-' + Date.now() + path.extname(file.originalname);
        cb(null, nuevaImg);
    }
});

//Ejecuto multer con la config anterior para agregarlo a la ruta
const upload = multer({storage : storage});

module.exports = upload;
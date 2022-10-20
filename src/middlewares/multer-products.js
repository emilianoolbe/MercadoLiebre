//Importo Multer + path
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    let type = file.mimetype.startsWith('image/'); // --> startsWith devuelve true o false
    let extensionesAceptadas = ['.jpg', '.png', '.gif' ];
    let fileExtension = path.extname(file.originalname);
    return type && extensionesAceptadas.includes(fileExtension) ? cb(null, true) : cb(null, false);
}

//Ejecuto multer con la config anterior para exportarlo al enrutador
const upload = multer({storage : storage, fileFilter: fileFilter});

module.exports = upload; 
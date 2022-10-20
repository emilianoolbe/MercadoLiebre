//Importo Multer + path
const multer = require('multer'); 
const path = require('path');

// const storage = multer.diskStorage({
//     destination:(req, file, cb) =>{
//         cb(null, path.join(__dirname, '../../public/imagenes/img-users'));
//     },
//     filename: (req, file, cb) =>{
//          //creo el nombre de la imagen (concateno el string + fecha en ms + extensión original)
//         let imagenUser = 'user-' + Date.now() + path.extname(file.originalname);
//         cb(null, imagenUser);
//     }
// });
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    let type = file.mimetype.startsWith('image/'); // --> startsWith devuelve true o false
    let extensionesAceptadas = ['.jpg', '.png', '.gif' ];
    let fileExtension = path.extname(file.originalname);
    return type && extensionesAceptadas.includes(fileExtension) ? cb(null, true) : cb(null, false);
}

const upload = multer({storage : storage, fileFilter : fileFilter});

module.exports = upload;
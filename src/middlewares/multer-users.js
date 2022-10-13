//Importo Multer + Path
const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, path.join(__dirname, '../../public/imagenes/img-users'));
    },
    filename: (req, file, cb) =>{
        let imagenUser = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, imagenUser);
    }
})

const upload = multer({storage : storage, 
fileFilter: (req, file, cb) => {
    let extensionesAceptadas = ['.jpg', '.png', '.gif' ];
    let fileExtension = path.extname(file.originalname);
    extensionesAceptadas.includes(fileExtension) ? cb(null, true) : cb(null, false);
}} );

module.exports = upload;
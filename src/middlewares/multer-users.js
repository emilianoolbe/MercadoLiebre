//Importo Multer
const multer = require('multer');

//Importo path
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

const upload = multer({storage : storage});

module.exports = upload;
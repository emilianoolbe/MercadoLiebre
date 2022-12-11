const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresion = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};
let fields = {
    name: false,
    price: false,
    discount: false,
    category: false,
    section: false,
    brand: false,
    description: false,
    img: false
};
const validetedErrors = (input, name, message, isError = true) => {
    if (isError) {
        input.nextElementSibling.innerText = message;
        input.nextElementSibling.classList.add('erroresFront');
        document.getElementById(name).classList.remove('is-valid');
        document.getElementById(name).classList.remove('inputBorderCorrect');
        document.getElementById(name).classList.add('is-invalid');  
        document.getElementById(name).classList.add('inputBorder');
        fields[name] = false;
    } else {
        input.nextElementSibling.innerText = '';
        input.nextElementSibling.classList.remove('erroresFront');
        document.getElementById(name).classList.add('is-valid');
        document.getElementById(name).classList.add('inputBorderCorrect');
        document.getElementById(name).classList.remove('is-invalid');  
        document.getElementById(name).classList.remove('inputBorder');
        fields[name] = true;
    };
};
const validateExpressions = (expresion, input, name, message) => {
    if (expresion.test(input.value) && input.length !== 0) {
        validetedErrors(input, name, message, true)
    } else {
        validetedErrors(input, name, message, false)
    };
};

const validateImg = (input, name) => {
    let imgExtension = input.file[0].name.split('.').pop().toLowerCase();
    let extensions = ['jpg, png, gif'];
    if (extensions.includes(imgExtension)) {
        validetedErrors(input, name, true)
    } else {
        validetedErrors(input, name, 'Debe agregar una imagen, (*) Las extensiones de imagenes permitidas son: .jpg  .png .gif', false)
    };
};
const validateField = (e) => {
    switch (e.target.name) {
        case 'name':
            break;
        case 'price':
            break;
        case 'discount':
            break;
        case 'category':
            break;
        case 'section':
            break;
        case 'brand':
            break;
        case 'description':
            break;
        case 'img':
            break;
    };
};
inputs.forEach((input)=> {
    input.addEventListener('keyup', validateField);
    input.addEventListener('blur', validateField);
    input.addEventListener('change', validateField);
});
formulario.addEventListener("submit", (e)=> {
    if (fields.name && fields.price && fields.discount && fields.category && fields.brand && fields.section && fields.description) {
        formulario.submit()
    } else {
        e.preventDefault();
        document.getElementById('formIncomplete').classList.add('validatationIncomplete-active')
    }; 
});
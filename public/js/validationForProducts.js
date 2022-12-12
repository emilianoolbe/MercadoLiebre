const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('.form-control');
const expresion = {
	nombre: /^[a-zA-ZÀ-ÿ-0-9\s]{5,100}$/, // Letras, espacios, números, pueden llevar acentos.
	precio: /^\d.{0,12}$/, // 0 al 12 numeros, numeros decimales.
    descuento: /^\d{0,2}$/ // numero 2 cifras.
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
    if (expresion.test(input.value) && input.value.length !== 0) {
        validetedErrors(input, name, message, false);
    } else {
        validetedErrors(input, name, message, true);
    };
};
const validateImg = (input, name) => {
    let imgExtension = input.files[0].name.split('.').pop().toLowerCase();
    let extensions = ['jpg', 'png', 'gif'];
    console.log(extensions.includes(imgExtension));
    if (extensions.includes(imgExtension)) {
        validetedErrors(input, name, '', false)
    } else {
        validetedErrors(input, name, 'Debe agregar una imagen, (*) Las extensiones de imagenes permitidas son: .jpg  .png .gif', true)
    };
};
const validateNotEmpty = (input, name, message)  => {
    if (input.value.trim().length != 0) {
        validetedErrors(input, name, message, false);
    } else {
        validetedErrors(input, name, message, true);
    };
};
const validateField = (e) => {
    switch (e.target.name) {
        case 'name':
            validateExpressions(expresion.nombre, e.target, e.target.name, 'Complete el campo con un nombre, mínimo 5 caractéres máximo 100');
            break;
        case 'price':
            validateExpressions(expresion.precio, e.target, e.target.name, 'Ingrese un precio, solamente números, puede incluir decimales');
            break;
        case 'discount':
            validateExpressions(expresion.descuento, e.target, e.target.name, 'El descuento debe ser un valor de 2 cifras, en caso de no tenerlo debe ser "0"');
            break;
        case 'category':
            validateNotEmpty(e.target, e.target.name, 'Seleccione categoria del producto');
            break;
        case 'section':
            validateNotEmpty(e.target, e.target.name, 'Seleccione sección del producto');
            break;
        case 'brand':
            validateNotEmpty(e.target, e.target.name, 'Seleccione la marca del producto');
            break;
        case 'description':
            validateNotEmpty(e.target, e.target.name, 'Ingrese una descripción');
            break;
        case 'img':
            validateImg(e.target, e.target.name);
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
//Capturo el formulario por ID
const formulario = document.getElementById('formulario')

//Capturo todos los inputs del formulario (querySelectorAll devuelve un ARRAY)
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
};
//Creo un objeto literal, donde al momento en donde no haya error cambio su valor a true
let fields = {
    nombre: false,
    email: false,
    fechanacimiento: false,
    domicilio: false,
    img: false,
    password: false
};
let validetedErrors = (input, name, message, isError = true ) => {
    if (isError) {
        document.getElementById(name).classList.remove('is-invalid');
        document.getElementById(name).classList.remove('inputBorder');
        document.getElementById(name).classList.add('is-valid');
        document.getElementById(name).classList.add('inputBorderCorrect');
        input.nextElementSibling.classList.remove('erroresFront');
        input.nextElementSibling.innerText = ''
        fields[name] = true;     
    } else {
        document.getElementById(name).classList.remove('is-valid');
        document.getElementById(name).classList.remove('inputBorderCorrect');
        document.getElementById(name).classList.add('is-invalid');  
        document.getElementById(name).classList.add('inputBorder');
        input.nextElementSibling.classList.add('erroresFront');
        input.nextElementSibling.innerText = message
        fields[name] = false;
    };
};
//FUNCIONES
const validateField = (expresiones, input, name, message) => {
    if (expresiones.test(input.value) && input.length !== 0) {
       validetedErrors(input, name, message, true);
    } else {
        validetedErrors(input, name, message, false)
    };       
};
const validateLength = (input, name, message) => {
    if (input.value.trim().length != 0) {
        validetedErrors(input, name, message, true);
    } else {
        validetedErrors(input, name, message, false);
    };      
};
const validateAvatar = (input, name) => {
    //e.target.files obtengo un array de los archivos --> [0] porque es 1 solo. 
    //.name me da un string, lo divido con split donde haya un '.' y el resultado es un array
    let fileExtension = input.files[0].name.split('.').pop().toLowerCase();
    let extensions =['jpg', 'png', 'gif' ];
    if (extensions.includes(fileExtension)) {
        validetedErrors(input, name, true);
    } else {
        validetedErrors(input, name, 'Debe agregar una imagen, (*) Las extensiones de imagenes permitidas son: .jpg  .png .gif', false);
    };    
};
//Función donde valido según el campo
const validateForm = (e) => {
    //Un switch para según el atributo name: "" se ejectue uno u otro código 
    switch (e.target.name) {
        case 'nombre':
            validateField(expresiones.nombre, e.target, e.target.name, 'El usuario debe ser entre 4 y 16 dígitos, solo puede contener números, letras y guion bajo');
            break;           
        case 'email':
            validateField(expresiones.correo, e.target, e.target.name, 'Formato inválido, debe estar compuesto solamente de letras, numeros, puntos, guiones y guion bajo: ejemplo@ejemplo.com');                           
            break;               
        case 'fechanacimiento':
            validateLength(e.target, e.target.name, 'Ingrese una fecha en el campo');
            break;      
        case 'domicilio':
            validateLength(e.target, e.target.name, 'Ingrese una dirección en el campo');
            break;         
        case 'img':
            validateAvatar(e.target, e.target.name)
            break;
        case 'password':
            validateField(expresiones.password, e.target, e.target.name, 'La contraseña tiene que tener un largo entre 4 y 12 dígitos');
            break;
        };
};
//Itero sobre el array y sobre cada input ejecuto un evento
inputs.forEach((input) =>{
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm)
    input.addEventListener('change', validateForm)
});

formulario.addEventListener("submit", (e) =>{
    if (fields.nombre && fields.password && fields.img && fields.fechanacimiento && fields.email && fields.domicilio) {
        formulario.submit();
    }else{
        e.preventDefault();
        document.getElementById('formIncomplete').classList.add('validatationIncomplete-active');
    };
});
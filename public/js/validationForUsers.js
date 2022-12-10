//Capturo el formulario por ID
const formulario = document.getElementById('formulario')

//Capturo todos los inputs del formulario (querySelectorAll devuelve un ARRAY)
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
//FUNCIONES
const validateField = (expresiones, input, name, message) => {
    if (expresiones.test(input.value)) {
        document.getElementById(name).classList.add('inputBorderCorrect');
        input.nextElementSibling.classList.remove('erroresFront');
        input.nextElementSibling.innerText = ''
        fields[name] = true;
    } else {
        document.getElementById(name).classList.remove('inputBorderCorrect');
        document.getElementById(name).classList.add('inputBorder');
        input.nextElementSibling.classList.add('erroresFront');
        input.nextElementSibling.innerText = message
        fields[name] = false;
    };       
};
const validateLength = (input, name, message) => {
    if (input.value.trim().length != 0) {
        document.getElementById(name).classList.add('inputBorderCorrect');
        input.nextElementSibling.classList.remove('erroresFront');
        input.nextElementSibling.innerText = '';
        fields[name] = true;
    } else {
        document.getElementById(name).classList.remove('inputBorderCorrect');
        document.getElementById(name).classList.add('inputBorder');
        input.nextElementSibling.classList.add('erroresFront');
        input.nextElementSibling.innerText = message;
        fields[name] = false;
    };      
};
const validateAvatar = (input, id) => {
    //e.target.files obtengo un array de los archivos --> [0] porque es 1 solo. 
    //.name me da un string, lo divido con split donde haya un '.' y el resultado es un array
    let fileExtension = input.files[0].name.split('.').pop().toLowerCase();
    let extesions =['jpg', 'png', 'gif' ]
    if (extesions.includes(fileExtension)) {
        document.getElementById(id).classList.add('inputBorderCorrect');
        document.getElementById(id).classList.remove('inputBorder');
        input.nextElementSibling.classList.remove('erroresFront');
        input.nextElementSibling.innerText = '';
        fields[id] = true;
    } else {
        document.getElementById('img').classList.remove('inputBorderCorrect');
        document.getElementById('img').classList.add('inputBorder');
        input.nextElementSibling.classList.add('erroresFront');
        input.nextElementSibling.innerText = 'Debe agregar una imagen, (*) Las extensiones de imagenes permitidas son: .jpg  .png .gif';
        fields[id] = false;
    };    
};
//Función donde valido según el campo
const validateForm = (e) => {
    //Un switch para según el atributo name: "" se ejectue uno u otro código 
    switch (e.target.name) {
        case 'nombre':
            validateField(expresiones.nombre, e.target, e.target.name, 'El usuario debe ser entre 4 y 16 dígitos, solo puede contener nuúmeros, letras y guion bajo')
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
            validateLength(e.target, e.target.name, 'Ingrese una contraseña en el campo');
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
    e.preventDefault();
    console.log(fields);
    if (fields.nombre && fields.password && fields.img && fields.fechanacimiento && fields.email && fields.domicilio) {
        formulario.submit();
    }else{
        document.getElementById('formIncomplete').classList.add('validatationIncomplete-active');
    };
});
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

let fields = {
    email: false,
    password: false
};
const expresions = {
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

validateField = (expresions, input, name, message) => {
    if (expresions.test(input.value) && input.length != 0) {
        input.nextElementSibling.innerText = '';
        input.nextElementSibling.classList.remove('erroresFront');
        document.getElementById(name).classList.add('is-valid');
        document.getElementById(name).classList.add('inputBorderCorrect');
        document.getElementById(name).classList.remove('is-invalid');
        fields[name] = true;
    } else {
        input.nextElementSibling.innerText = message;
        input.nextElementSibling.classList.add('erroresFront');
        document.getElementById(name).classList.remove('is-valid');
        document.getElementById(name).classList.remove('inputBorderCorrect');
        document.getElementById(name).classList.add('inputBorder');
        document.getElementById(name).classList.add('is-invalid');
        fields[name] = false;
    };
};
const validateForm = (e) => {
    switch (e.target.name) {
        case 'email':
            validateField(expresions.email, e.target, e.target.name, 'Se espera un formato de mail: ejemplo@ejemplo.com');
            break;
        case 'password':
            validateField(expresions.password, e.target, e.target.name, 'Ingrese una contraseña en el campo');
            break;
    };
};
inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
})
formulario.addEventListener("submit", (e) => {
    if (fields.email && fields.password) {
        formulario.submit();
    } else {
        e.preventDefault();
        document.getElementById('formIncomplete').classList.add('validatationIncomplete-active');
    };
});
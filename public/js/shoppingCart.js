window.addEventListener("load", () => {
    //Funsión que va a verificar si existe algo en el carrito, lo contrario devuelvo 0
    function productInCart() {
        return localStorage.shoppingCart ? JSON.parse(localStorage.shoppingCart).length : 0;
    };
    //Capturo los botones comprar
    let buyButton = document.querySelectorAll('#buy-button');

    //Capturo el span que aparece el n° de productos en el carrito
    //Cada vez que actualizo el carrito, le agregaré el innerText
    //Pero también lo tengo que hacer antes del evento para saber si existe localstorage
    let cartNumber = document.querySelector('.cart-number');
    cartNumber.innerText = productInCart();

    //Por cada botón escucho el evento 'click'
    buyButton.forEach((button) => {
        button.addEventListener('click', (e) => {

            //En la vista con el atributo data- me guardo en dataset ese algo, en este caso el Id del producto
            //console.log(e.target.dataset.id);

            //Pregunto primero si hay carrito en localStorage
            if (localStorage.shoppingCart) {
                
                //Si hay carrito parseo  --> JSON.parse
                let cart = JSON.parse(localStorage.shoppingCart);
                //Si en el carrito ya existe el producto +1 sino, push
                //Método de array findIndex - busco en el array CART si existe un producto con el id que se clickeó
                //Devuelve el índice del producto si existe, sino -1
                let index = cart.findIndex( (product) => product.id == e.target.dataset.id); //--> cuidado con las llaves!!
                //Si en la variale index tengo el índice del producto, le sumo la quantity
                if (index != -1) {
                    cart[index].quantity++;
                }else{
                    //Sino, push al array el nuevo producto
                    cart.push({id: e.target.dataset.id, quantity: 1});
                };
                //Luego guardo en localStorage la actualización --> vuelvo a convertir el array a JSON
                localStorage.setItem('shoppingCart', JSON.stringify(cart));
            }else{

                //Si no hay carrito, lo creo, en local se guarda únicamente texto  --> JSON.stringify
                localStorage.setItem('shoppingCart', JSON.stringify([{id: e.target.dataset.id, quantity: 1}]));
            };
            //Cada vez que se escucha el evento se agrega el producto al cartnumber
            cartNumber.innerText = productInCart();
        });
    });
});
window.addEventListener("load", () => {
    
    //Función para vacíar carrito
    function emptyCart() {
        localStorage.removeItem('shoppingCart');
    };
    //Función que va calcular el total de lo que hay en el carrito
    //El segundo parámetro del reduce, indica en que valor empieza el acum
    function totalPrice(products) {
        return products.reduce((acum, product) => (acum += ((((100 - product.discount) * product.price) / 100) * product.quantity)), 0)
    };
    //Antes de todo creo la variable productos para poder calcular el total después
    let products = [];

    //Capturo el body de la tabla
    let cartRows = document.querySelector('.cartRows');

    //1) Completar el carrito con la data de localStorage.
    if (localStorage.shoppingCart) {
  
        //Si existe carrito, lo traigo JSON.parse()
        let shoppingCart = JSON.parse(localStorage.shoppingCart);
        // ACLARACION: en localStorage se guarda solamente el id del producto y la cantidad
        // Los demas datos, los tengo que consumir desde un endpoint a la DB porque son valores mutables
        
        shoppingCart.forEach((item, index) => {


            //Hago un fetch a la db
            fetch(`/api/productApi/${item.id}`)
                .then((res) => {return res.json()}) //primer then() lo convierto a JSON
                .then((product) =>{ //segundo then() ya tengo el  producto
                    
                    if (product) { //Primero me pregunto si viene el producto en la db
                        
                        //Al body de la tabla lo cambio mientras hago el forEach() de los productos
                        //<td>${parseFloat(product.price * item.quantity,2).toFixed(2)}</td> parseFloat tofixed 2 para que no me de decimales
                        cartRows.innerHTML += `
                            <tr class="row${index}"> 
                                <th scoupe="row"> ${index + 1}</th>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td class="text-center">${item.quantity}</td>
                                <td class="text-center">${product.discount}</td>
                                <td class="text-center">${parseFloat((((100 - product.discount)*product.price) / 100) * item.quantity,2).toFixed(2)}</td>
                                <td><button class="btn btn-danger btn-sm buttonDelete"  data-index="${index}" ><i class="fa-solid fa-trash-can"></i></button></td>
                            </tr>
                        `
                        //Actualizo el array de productos, con los datos que necesito para guardar en la db
                        //Lo guardado en localStorage y los datos de la db
                        products.push({product_id: product.id, name: product.name, price: product.price, discount: product.discount, quantity: item.quantity})
                    }else{
                        //Elimino el producto que no viene de localStorage - del index + 1
                        shoppingCart.splice(index, 1);
                        //Tengo que volver a crear el localStorage
                        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                    };
                    deleteProduct()
                })
                //Calculo el total
                .then(() => {
                    document.getElementById('totalCarrito').innerText = `${totalPrice(products)}`
                })
        });        
        //Función eliminar producto del carrito
        function deleteProduct() {
            let buttonDelete = document.querySelectorAll('.buttonDelete');
            buttonDelete.forEach((button) => {
                button.addEventListener('click', (e) => {
                    shoppingCart.splice(e.target.dataset.index, 1);
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                });
                button.addEventListener('click', () => {location.reload()})
            })
        }
    };
    //Finalizar compra.
    let formCart = document.getElementById('checkoutCart');
    formCart.addEventListener("submit", (e) =>{
        e.preventDefault();
        //Para envíar información a la db desde el front es por fetch método POST, primero hay que detallar la formData
        const formData = {
            orderItems: products, // esto es un array que contiene los valores a agregar para el detalle de la orden
            payment_Method: formCart.paymentMethod.value, //estoy accediendo al name del SELECT del formulario
            shipping_Method: formCart.shippingMethod.value,
            total: totalPrice(products)
        };

    
        fetch('/api/purchaseCheckout',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })
        .then((res) =>  res.json())
        .then((data) =>{
            console.log(data);
            if (data.ok) { //en la respuesta del controlador seteo {ok: true, status: 200, order: order} 
                emptyCart();
                location.href = '/users/profile'
            };
        })
    });
});
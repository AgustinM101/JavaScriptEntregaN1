const productos = [];
let precios = [];
let carrito = [];
let total = 0;


function mostrarProductosDisponibles(productos) {
    console.log("Lista de productos disponibles - \n");
    for (let i = 0; i < productos.length; i++) {
        console.log("Producto: "+ productos[i]+" - Precio: "+precios[i] +"\n" );
    }
}

function agregarAlCarrito(productos, carrito, precios) { 

    let { producto, indiceProducto, indiceCarrito } = seleccionarProducto(productos, carrito);

    if (indiceProducto !== -1) { // si el producto esta en productos disponibles
        let confirmacion = confirm("Confirmas agregar " + producto + " al carrito?");
        if (confirmacion) {
            let precio = precios[indiceProducto];
            let productoEliminado = productos.splice(indiceProducto, 1)[0]; // eliminar de productos disponibles
            carrito.push({ producto, precio }); // agregar al carrito
            total += precio;
            alert(producto + " agregado al carrito. Total acumulado: " + total);
        } else {
            alert(producto + " no agregado al carrito.");
        }
    } else if (indiceCarrito !== -1) { // si el producto ya esta en el carrito
        alert("Este producto ya esta en el carrito.");
    }
}



function eliminarDelCarrito(productos, carrito, precios) {

    let productoSeleccionado = seleccionarProducto(carrito);

    let productoEliminado = carrito.splice(indice, 1)[0]; // utilizo el splice dentro de producto para asi borrar del carrito y agregar a los productos
    productos.push(productoEliminado.producto); // lo devuelve a los productos disponibles
    precios.push(productoEliminado.precio); // devuelve el precio a la lista de precios
    total -= productoEliminado.precio; // resta el precio del total acumulado

    console.log(productoEliminado.producto +" eliminado del carrito y devuelto a la lista de productos. Total acumulado: "+total);
}


function seleccionarProducto(productos) {
    
    while (true) {
        let producto = prompt("Ingresa el nombre del producto que quieres eliminar o agregar al carrito: \n" );

        let indiceProducto = productos.indexOf(producto);

        let indiceCarrito = carrito.findIndex(item => item.producto === producto); // utilizo findIndex para encontrar el indice y si no lo encuentra devuelve -1

        if (indiceProducto !== -1 || indiceCarrito !== -1) {
            return { producto, indiceProducto, indiceCarrito }; // Regresamos el producto y los índices
        } else {
            alert(producto + " no se ha encontrado, por favor ingrese otro producto.");
        }
    }
}

function mostrarCarrito(carrito,total) {
    console.log("Carrito actual:");
    if (carrito.length === 0) {
        console.log("El carrito esta vacio.");
        return;
    }
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito.producto[i] + " - "+carrito.precio[i]+"\n");
    }
    console.log("Total acumulado: "+total);
}

function core() {
    const productos= ["mayonesa","leche", "harina","huevos"];
    let precios = [350, 120, 200, 600];
    let continuar = true;

    while (continuar) {
        let opcion = parseInt(prompt("Selecciona una opcion:\n1. Ver productos disponibles.\n2. Agregar 1 producto al carrito.\n3. Eliminar un producto del carrito.\n4. Ver carrito\n5. Pagar y Salir. \n" ));
        
        switch (opcion) {
            case 1:
                mostrarProductosDisponibles(productos);
                break;
            case 2:
                agregarAlCarrito(productos, carrito, precios);
                break;
            case 3:
                eliminarDelCarrito(productos, carrito, precios);
                break;
            case 4:
                mostrarCarrito(carrito,total);
                break;
            case 5:
                mostrarCarrito(carrito,total);
                alert("Ha pagado "+total+", gracias por su compra!");
                let continuar = false;
                break;
            default:
                alert("Opcion no valida, intenta de nuevo.");
                break;
        }
    }
}

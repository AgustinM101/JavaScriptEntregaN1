let productos = [];
let precios = [];
let carrito = [];

function MostrarProductosDisponibles(productos) {
    
    console.log("Lista de productos disponibles - \n");
    for (let i = 0; i < productos.length; i++) {

        let respuesta = parseInt(prompt("Producto: ${productos[i]} \nQuieres agregar este producto al carrito? Escribe 1 para Si o 0 para No:" ));
        
        if (respuesta === 1) { // valido para saber la respuesta de la persona
            console.log("${productos[i]} agregado al carrito");
            AgregarAlCarrito(productos,i,carrito);
        }else if (respuesta === 0) {
            console.log("No se agrego ${productos[i]}");
        }else{ 
            console.log("Respuesta no valida. Por favor, elige 1 o 0");
            i--; // retrocede una posicion para preguntar por el mismo producto de nuevo
        }
    }
    
}

function AgregarAlCarrito(productos, indice, carrito) {
    let confirmacion = confirm("Confirmas agregar ${productos[indice]} al carrito?");
    if (confirmacion) {
        let producto = productos.splice(indice, 1)[0]; // aplico lo mismo que en la linea 39
        carrito.push(producto);
        alert("${producto} agregado al carrito exitosamente");
    }
}


function EliminarDelCarrito(productos, indice, carrito) {
    let producto = carrito.splice(indice, 1)[0]; // utilizo el splice dentro de producto para asi borrar del carrito y agregar a los productos
    productos.push(producto); // lo devuelve a los productos disponibles
    console.log("${producto} eliminado del carrito y devuelto a la lista de productos");
}

function core() {
    
}
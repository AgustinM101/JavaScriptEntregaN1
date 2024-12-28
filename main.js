
const productos = [
    { id: 1, nombre: "Producto 1", precio: 1000, imagen: "assets/img/leudanteHarina.png" },
    { id: 2, nombre: "Producto 2", precio: 2000, imagen: "assets/img/naturaMayo.png" },
    { id: 3, nombre: "Producto 3", precio: 3000, imagen: "assets/img/santaMartaHuevos.png" }, 
    { id: 4, nombre: "Producto 4", precio: 4000, imagen: "assets/img/serenisimaLeche.png" }  
  ];
  const carrito = [];
  let total = 0;
  
//elementos del DOM
  const productosContainer = document.querySelector(".row");
  const verCarritoBtn = document.getElementById("ver-carrito");
  const carritoContainer = document.createElement("div");
  carritoContainer.classList.add("container", "my-4");
  carritoContainer.style.display = "none";
  
//función para renderizar los productos en la página
  function renderProductos() {
    productosContainer.innerHTML = ""; // limpia productos
    productos.forEach((producto, index) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4");
      card.innerHTML = `
        <div class="card">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <button class="btn btn-success" data-index="${index}">Agregar al carrito</button>
          </div>
        </div>
      `;
      productosContainer.appendChild(card);
    });
  
//agregar evento a los botones
    const agregarBtns = document.querySelectorAll(".btn-success");
    agregarBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => agregarAlCarrito(e.target.dataset.index))
    );
  }
  
//función para agregar un producto al carrito
  function agregarAlCarrito(index) {
    const producto = productos[index];
    carrito.push(producto);
    total += producto.precio;
    productos.splice(index, 1); // eliminar de productos disponibles
    renderProductos();
    renderCarrito();
  }
  
//función para renderizar el carrito
  function renderCarrito() {
    carritoContainer.innerHTML = ""; // kimpiar contenido
    carrito.forEach((producto, index) => {
      const row = document.createElement("div");
      row.classList.add("row", "align-items-center", "mb-3");
      row.innerHTML = `
        <div class="col-md-6">${producto.nombre}</div>
        <div class="col-md-3">$${producto.precio}</div>
        <div class="col-md-3">
          <button class="btn btn-danger" data-index="${index}">Eliminar</button>
        </div>
      `;
      carritoContainer.appendChild(row);
    });
  
//Total
    const totalRow = document.createElement("div");
    totalRow.classList.add("text-end", "mt-3");
    totalRow.innerHTML = `<strong>Total: $${total}</strong>`;
    carritoContainer.appendChild(totalRow);
  
//botón de pagar
    const pagarBtn = document.createElement("button");
    pagarBtn.classList.add("btn", "btn-primary", "mt-3");
    pagarBtn.textContent = "Pagar y salir";
    pagarBtn.addEventListener("click", pagar);
    carritoContainer.appendChild(pagarBtn);
  
//agregar evento a los botones de eliminar
    const eliminarBtns = carritoContainer.querySelectorAll(".btn-danger");
    eliminarBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => eliminarDelCarrito(e.target.dataset.index))
    );
  }
  
//función para eliminar un producto del carrito
  function eliminarDelCarrito(index) {
    const producto = carrito[index];
    productos.push(producto);
    total -= producto.precio;
    carrito.splice(index, 1); // eliminar del carrito
    renderProductos();
    renderCarrito();
  }
  
//función para pagar
  function pagar() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert(`Gracias por su compra. Total a pagar: $${total}`);
    carrito.splice(0, carrito.length); //vaciar el carrito
    total = 0;
    renderCarrito();
  }
  
//alternar la visibilidad del carrito
  verCarritoBtn.addEventListener("click", () => {
    carritoContainer.style.display =
      carritoContainer.style.display === "none" ? "block" : "none";
  });
  
// inicialización
  document.body.appendChild(carritoContainer);
  renderProductos();
  
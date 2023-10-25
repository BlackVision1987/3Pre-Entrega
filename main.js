const productos = [
  { nombre: "Camisa", precio: 20 },
  { nombre: "Pantalón", precio: 30 },
  { nombre: "Zapatos", precio: 50 },
  { nombre: "Sombrero", precio: 10 },
  { nombre: "Gorra", precio: 15 },
  { nombre: "Bufanda", precio: 12 },
  { nombre: "Guantes", precio: 8 },
  { nombre: "Vestido", precio: 40 },
  { nombre: "Corbata", precio: 18 },
  { nombre: "Calcetines", precio: 5 },
  { nombre: "Abrigo", precio: 60 },
  
];


const productosHTML = document.querySelectorAll('button[id^="producto"]');
const botonPagar = document.getElementById('pagar');
const carritoElement = document.getElementById('carrito');
const totalElement = document.getElementById('total');


let carrito = [];
let total = 0;


function mostrarMensaje(mensaje) {
  const mensajeElement = document.createElement('p');
  mensajeElement.textContent = mensaje;
  document.body.appendChild(mensajeElement);
}


productosHTML.forEach((producto, index) => {
  producto.addEventListener('click', () => {
      const productoElegido = productos[index];
      carrito.push(productoElegido);
      total += productoElegido.precio;
      mostrarMensaje(`${productoElegido.nombre} se ha añadido al carrito.`);
      actualizarCarrito();
  });
});


botonPagar.addEventListener('click', () => {
  mostrarMensaje('Resumen de la compra:');
  carrito.forEach((producto) => {
      mostrarMensaje(`${producto.nombre} - $${producto.precio}`);
  });
  mostrarMensaje(`Total a pagar: $${total}`);
  mostrarMensaje('Gracias por comprar con nosotros. ¡Vuelve pronto!');
  vaciarCarrito();
});


function actualizarCarrito() {
  carritoElement.innerHTML = '';
  carrito.forEach((producto) => {
      const item = document.createElement('li');
      item.textContent = `${producto.nombre} - $${producto.precio}`;
      carritoElement.appendChild(item);
  });
  totalElement.textContent = `Total: $${total}`;
  guardarCarritoEnLocalStorage();
}


function vaciarCarrito() {
  carrito = [];
  total = 0;
  carritoElement.innerHTML = '';
  totalElement.textContent = '';
  guardarCarritoEnLocalStorage();
}


function guardarCarritoEnLocalStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJSON);
}


function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarCarrito();
  }
}


cargarCarritoDesdeLocalStorage();
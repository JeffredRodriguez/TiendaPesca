const carritoEmergentes = document.getElementById("carritoEmergentes");
const popup = document.getElementById("popup");
const carritoContenido = document.getElementById("carritoContenido");

carritoEmergentes.addEventListener("click", () => {
    actualizarPopup();
    togglePopup();
});

const cerrarPopup = () => {
    popup.style.display = "none";
};

const togglePopup = () => {
    if (popup.style.display === "flex") {
        popup.style.display = "none";
    } else {
        popup.style.display = "flex";
    }
};

const actualizarPopup = () => {
    // Limpiar el contenido actual del carrito
    carritoContenido.innerHTML = "";

    // Agregar elementos al carrito (puedes personalizar esto según tus necesidades)
    agregarElementoAlCarrito("Producto 1", 10);
    agregarElementoAlCarrito("Producto 2", 20);
    // ... más elementos ...
};

const agregarElementoAlCarrito = (nombre, precio) => {
    const elemento = document.createElement("div");
    elemento.className = "itemCarrito";
    elemento.innerHTML = `<span>${nombre} - $${precio}</span>
                          <button class="comprarItem" onclick="comprarElemento('${nombre}', ${precio})">Comprar</button>
                          <button class="eliminarItem" onclick="eliminarElemento('${nombre}')">Eliminar</button>`;
    carritoContenido.appendChild(elemento);
};

const comprarElemento = (nombre, precio) => {
    // Lógica para comprar el elemento (puedes personalizar esto según tus necesidades)
    console.log(`Comprar ${nombre} por $${precio}`);
};

const eliminarElemento = (nombre) => {
    // Lógica para eliminar el elemento del carrito (puedes personalizar esto según tus necesidades)
    console.log(`Eliminar ${nombre} del carrito`);
    actualizarPopup(); // Actualizar la vista después de eliminar un elemento
};

document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".popup-content button");
    if (closeButton) {
        closeButton.addEventListener("click", cerrarPopup);
    }
});



//logica de los productos destacados//

const URLApi = "http://localhost:8082/api-proyecto/productos";
const URLImg = "http://localhost:8082/api-proyecto/img?imageRootName=";
const productosDestacadosContainer = document.getElementById('productosDestacadosContainer');

// Función para obtener datos de la API
async function obtenerProductosDestacados() {
    try {
        const response = await fetch(URLApi);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

// Función para renderizar los productos en el contenedor
function renderizarProductos(productos) {
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('productoDestacado');

        const imagenElement = document.createElement('img');
        imagenElement.src = `${URLImg}${producto.imagen}`;
        imagenElement.alt = producto.nombre;

        const nombreElement = document.createElement('h3');
        nombreElement.textContent = producto.nombre;

        const precioElement = document.createElement('p');
        precioElement.textContent = `Precio: ${producto.precio}`;

        productoElement.appendChild(imagenElement);
        productoElement.appendChild(nombreElement);
        productoElement.appendChild(precioElement);

        productosDestacadosContainer.appendChild(productoElement);
    });
}

// Función principal para cargar y mostrar productos destacados
async function cargarProductosDestacados() {
    try {
        const productosDestacados = await obtenerProductosDestacados();
        renderizarProductos(productosDestacados);
    } catch (error) {
        console.error('Error al cargar productos destacados:', error);
    }
}

// Llama a la función principal al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductosDestacados);

////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Función para renderizar los productos en el contenedor
function renderizarProductos(productos) {
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('productoDestacado');

        const imagenElement = document.createElement('img');
        imagenElement.src = `${URLImg}${producto.imagen}`;
        imagenElement.alt = producto.nombre;

        const nombreElement = document.createElement('h3');
        nombreElement.textContent = producto.nombre;

        const precioElement = document.createElement('p');
        precioElement.textContent = `Precio: ${producto.precio}`;

        // Crear el botón para agregar al carrito
        const agregarAlCarritoBtn = document.createElement('button');
        agregarAlCarritoBtn.textContent = 'Agregar al carrito';
        agregarAlCarritoBtn.addEventListener('click', () => agregarAlCarrito(producto));

        productoElement.appendChild(imagenElement);
        productoElement.appendChild(nombreElement);
        productoElement.appendChild(precioElement);
        productoElement.appendChild(agregarAlCarritoBtn);

        productosDestacadosContainer.appendChild(productoElement);
    });
}







const father = document.getElementById('productGrid');
const containerCategory = document.querySelector('.containerCategory');
const URLApi = "http://localhost:8082/api-proyecto/productos";
const URLApii = "http://localhost:8082/api-proyecto";
const URLImg = "http://localhost:8082/api-proyecto/img?imageRootName=";
let btnSiguiente = document.getElementById('btnSiguiente');
let btnAnterior = document.getElementById('btnAnterior');
let pageIndicator = document.getElementById('pageIndicator');
let page = 0;
let totalPage;
let currentPage;
let urlToFetch;
const inputBuscar = document.getElementById('buscar');
const btnBuscar = document.getElementById('btnBuscar');
const productGrid = document.getElementById('productGrid');


const requestOptions = {
    method: "GET",
    mode: "cors"
};

let cargarArticulos = async () => {
    await fetch(urlToFetch, requestOptions)
        .then(response => response.json())
        .then(datos => {
            totalPage = datos.totalPages;
            currentPage = datos.number;
            let articulos = datos.content;
            const fragmento = document.createDocumentFragment();
            father.innerHTML = '';

            articulos.forEach(element => {
                const createElement = document.createElement('div');
                createElement.className = 'card'; // Cambiado a card
                createElement.innerHTML = `
                    <div class="product">
                        <img class="imgProducto" src="${ URLImg + element.imagen }" alt="imagen">
                        <div class="product-info">
                            <p class="nombre">${element.nombre}</p>
                            <p class="descripcion">${element.descripcion}</p>
                            <p class="precio">Precio:₡${element.precio}</p>
                            <p class="cantidad">Cantidad:${element.cantidad}</p>
                            <button class="comprar-btn" data-product-id="${element.id}">Agregar al carrito</button>
                        </div>
                    </div>`;

                    const botonAgregar = createElement.querySelector('.comprar-btn');
                    botonAgregar.addEventListener('click', () => {
                        // Crear el objeto del producto
                        const producto = {
                            id: element.id,
                            nombre: element.nombre,
                            descripcion: element.descripcion,
                            precio: element.precio,
                            imagen: element.imagen
                        };
                        // Agregar el producto al carrito
                        agregarAlCarrito(producto);
                    });

                fragmento.appendChild(createElement);
            });

            father.appendChild(fragmento);
            pageIndicator.innerHTML = `Página ${currentPage + 1} de ${totalPage}`;
        })
        .catch(error => {
            console.log(error);
        });
};


btnSiguiente.addEventListener('click', function () {
    if (currentPage + 1 < totalPage) {
        page++;
        urlToFetch = URLApi + '?' + 'page=' + page;
        cargarArticulos();
        pageIndicator.innerHTML = `Página ${currentPage + 1} de ${totalPage}`;
    } else {
        alert('Ha llegado a la última página');
    }
});

btnAnterior.addEventListener('click', function () {
    if (currentPage > 0) {
        page--;
        urlToFetch = URLApi + '?' + 'page=' + page;
        cargarArticulos();
        pageIndicator.innerHTML = `Página ${currentPage + 1} de ${totalPage}`;
    } else {
        alert('Ha llegado a la primera página');
    }
});

// Cargar productos al inicio
urlToFetch = URLApi + '?' + 'page=' + page;
cargarArticulos();














const carritoEmergentes = document.getElementById("carritoEmergentes");
const popup = document.getElementById("popup");
const carritoContenido = document.getElementById("carritoContenido");

// Variable global para almacenar los productos del carrito
let carrito = [];

// Función para abrir y cerrar el popup
carritoEmergentes.addEventListener("click", () => {
    actualizarPopup();
    togglePopup();
});

// Función para cerrar el popup
const cerrarPopup = () => {
    popup.style.display = "none";
};

// Función para mostrar u ocultar el popup
const togglePopup = () => {
    if (popup.style.display === "flex") {
        popup.style.display = "none";
    } else {
        popup.style.display = "flex";
    }
};

// Función para actualizar el contenido del popup
const actualizarPopup = () => {
    // Limpiar el contenido actual del carrito
    carritoContenido.innerHTML = "";

    // Verificar si hay productos en el carrito
    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        // Agregar los productos al carrito
        carrito.forEach(producto => {
            agregarElementoAlCarrito(producto);
        });

          // Mostrar el total del carrito antes del botón de compra
          const totalElement = document.createElement("div");
          totalElement.id = "totalCarrito";
          totalElement.style.fontWeight = "bold";
          totalElement.style.fontSize = "18px";
          totalElement.style.paddingTop = "10px";
          totalElement.innerHTML = `Total: ₡${calcularTotal()}`;
          carritoContenido.appendChild(totalElement);

        const botonCompra = document.createElement("button");
        botonCompra.textContent = "Comprar";
        botonCompra.id = "botonComprar";
        botonCompra.addEventListener("click", comprar);
        carritoContenido.appendChild(botonCompra);
    }
    };
   
// Función para calcular el total del carrito
const calcularTotal = () => {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });
    return total;
};





// Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    carrito.push(producto); // Agregar el producto al carrito
    actualizarPopup(); // Actualizar la vista del carrito
    guardarCarritoEnLocalStorage(); // Guardar el carrito en el LocalStorage
    console.log('Producto agregado al carrito:', producto);
};

// Función para agregar un elemento al carrito en el popup
const agregarElementoAlCarrito = (producto) => {
    const elemento = document.createElement("div");
    elemento.className = "itemCarrito";
    elemento.innerHTML = `
        <span>Nombre:${producto.nombre} <br> Precio: ₡${producto.precio}  Descripción: ${producto.descripcion}</span>
        <button class="eliminarItem" data-id="${producto.id}">Eliminar</button>`;
    
    // Añadir el evento al botón de eliminar
    const botonEliminar = elemento.querySelector('.eliminarItem');
    botonEliminar.addEventListener('click', () => eliminarElemento(producto.id, elemento));
    
    carritoContenido.appendChild(elemento);
};

// Función para eliminar un producto del carrito
const eliminarElemento = (productId, elemento) => {
    // Eliminar el producto del carrito
    carrito = carrito.filter(item => item.id !== productId);
    
    // Eliminar el elemento del DOM
    carritoContenido.removeChild(elemento);
    
    
    // Guardar el carrito actualizado en el LocalStorage
    guardarCarritoEnLocalStorage();
};

// Función para guardar el carrito en el LocalStorage
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para cargar el carrito desde el LocalStorage
const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarPopup(); // Actualizar el popup con los productos cargados
    }
};

const comprar = () => {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }

    // Calcular el total
    let total = 0;
    let productosComprados = "";

    carrito.forEach(producto => {
        productosComprados += `${producto.nombre} - ₡${producto.precio}<br>`;
        total += producto.precio;
    });

    // Crear el mensaje de compra con estilo similar a un modal
    const mensajeCompra = document.createElement("div");
    mensajeCompra.id = "mensajeCompra";
    mensajeCompra.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Compra realizada</h5>
                <button type="button" class="close-btn" id="closeBtn">&times;</button>
            </div>
            <div class="modal-body">
                <p>Has comprado:</p>
                <p>${productosComprados}</p>
                <p><strong>Total: ₡${total}</strong></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-close" id="okBtn">OK</button>
            </div>
        </div>
    `;

    // Añadir el mensaje al body
    document.body.appendChild(mensajeCompra);

    // Mostrar el modal de manera visible
    mensajeCompra.style.display = "flex";

    // Agregar el evento para cerrar el modal al botón "OK" y al "×"
    document.getElementById("closeBtn").addEventListener("click", () => {
        mensajeCompra.style.display = "none";
        mensajeCompra.remove();
    });
    document.getElementById("okBtn").addEventListener("click", () => {
        mensajeCompra.style.display = "none";
        mensajeCompra.remove();
    });

    // Limpiar el carrito y actualizar en LocalStorage
    carrito = [];
    actualizarPopup();
    guardarCarritoEnLocalStorage();
};



// Cargar el carrito desde el LocalStorage cuando se carga la página
window.onload = () => {
    cargarCarritoDesdeLocalStorage();
};























//logica para filtrar productos//
document.addEventListener('DOMContentLoaded', () => {
    const categoriasContainer = document.getElementById('categorias');
    const productGrid = document.getElementById('productGrid');
    const URLApi = "http://localhost:8082/api-proyecto";
    const URLImg = "http://localhost:8082/api-proyecto/img?imageRootName=";

    categoriasContainer.addEventListener('click', async (event) => {
        if (event.target.tagName === 'IMG') {
            const categoriaSeleccionada = event.target.alt;
            await filtrarProductosPorCategoria(categoriaSeleccionada);
        }
    });

    async function obtenerCategorias() {
        try {
            const response = await fetch(`${URLApi}/productos/categories`);
            if (response.ok) {
                const categorias = await response.json();
                mostrarCategorias(categorias);
            } else {
                console.error('Error al obtener las categorías:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    async function filtrarProductosPorCategoria(categoria) {
        try {
            const queryParams = `categorias=${categoria}`;
            const response = await fetch(`${URLApi}/productos/filtered?${queryParams}`);

            if (response.ok) {
                const productosFiltrados = await response.json();
                mostrarProductos(productosFiltrados.content); // "content" es la lista de productos
            } else {
                console.error('Error al obtener productos por categoría:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    function mostrarCategorias(categorias) {
        categorias.forEach(categoria => {
            const div = document.createElement('div');
            div.className = 'icononos';
    
            const img = document.createElement('img');
            img.className = 'imgcategorias';
    
            // Ajusta la ruta de la imagen según la estructura de tu carpeta
            img.src = `../imagenes_de_la_web/Categorias/${categoria}.png`;
            img.alt = categoria;

            const nombreProducto = document.createElement('p');
        nombreProducto.className = 'nombreProducto';
        nombreProducto.textContent = categoria;

    
            div.appendChild(img);
            div.appendChild(nombreProducto); 
            categoriasContainer.appendChild(div);
        });
    }
    

    function mostrarProductos(productos) {
        productGrid.innerHTML = '';

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'card'; // Cambiado a card

            card.innerHTML = `
                <div class="product">
                    <img class="imgProducto" src="${URLImg + producto.imagen}" alt="imagen">
                    <div class="product-info">
                        <p class="nombre">${producto.nombre}</p>
                        <p class="descripcion">${producto.descripcion}</p>
                        <p class="precio">Precio: ₡${producto.precio}</p>
                        <p class="cantidad">Cantidad: ${producto.cantidad}</p>
                        <button class="comprar-btn" data-product-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>`;

            productGrid.appendChild(card);
        });
    }

    // Cargar las categorías al cargar la página
    obtenerCategorias();
});





// Lógica para barra de búsqueda productos 



// Evento para buscar productos al hacer clic en el botón de búsqueda
btnBuscar.addEventListener('click', async () => {
    const query = inputBuscar.value.trim();
    if (query) {
        await buscarProductosPorNombre(query);
    } else {
        alert('Por favor, ingresa un término de búsqueda.');
    }
});

// Evento para buscar productos al presionar Enter en el campo de búsqueda
inputBuscar.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const query = inputBuscar.value.trim();
        if (query) {
            await buscarProductosPorNombre(query);
        } else {
            alert('Por favor, ingresa un término de búsqueda.');
        }
    }
});

// Función para buscar productos por nombre
async function buscarProductosPorNombre(nombre) {
    try {
        const response = await fetch(`${URLApi}/productos/buscarProductos?nombre=${nombre}`);
        if (response.ok) {
            const productos = await response.json();
            mostrarProductos(productos.content); // "content" es la lista de productos
        } else {
            console.error('Error al buscar productos:', response.statusText);
            alert('No se encontraron productos con ese nombre.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al realizar la búsqueda.');
    }
}

// Función para mostrar los productos en el grid
function mostrarProductos(productos) {
    productGrid.innerHTML = ''; // Limpiar el grid de productos

    if (productos.length === 0) {
        productGrid.innerHTML = '<p>No se encontraron productos.</p>';
    } else {
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'card'; // Cambiado a card

            card.innerHTML = `
                <div class="product">
                    <img class="imgProducto" src="${URLImg + producto.imagen}" alt="imagen">
                    <div class="product-info">
                        <p class="nombre">${producto.nombre}</p>
                        <p class="descripcion">${producto.descripcion}</p>
                        <p class="precio">Precio: ₡${producto.precio}</p>
                        <p class="cantidad">Cantidad: ${producto.cantidad}</p>
                        <button class="comprar-btn" data-product-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>`;

            productGrid.appendChild(card);
        });
    }
}










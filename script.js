let productoActual = { nombre: '', precioBase: 0, categoria: '' };
let saborSeleccionado = 'Arequipe & Chispas';
let carrito = [];

const nombresCategorias = {
    'MINI_DONAS': 'Mini Donas',
    'MINI_DONAS_TEMATICAS': 'Fechas Especiales',
    'DESAYUNOS': 'Desayunos',
    'CARTELERAS': 'Bandejas & Regalos'
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contenedor-productos')) {
        renderizarProductos('TODOS');
    }
    if (document.getElementById('tabla-admin-productos')) {
        renderizarTablaAdmin();
    }

    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 2);
    const fechaMinima = hoy.toISOString().split('T')[0];
    const inputFecha = document.getElementById('fechaEntrega');
    if (inputFecha) {
        inputFecha.min = fechaMinima;
        inputFecha.value = fechaMinima;
    }
});

// Renderizar productos en la tienda pública con selector de opciones
function renderizarProductos(categoriaFiltro) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    let html = '';

    const filtrados = categoriaFiltro === 'TODOS' ? productos : productos.filter(p => p.categoria === categoriaFiltro);

    filtrados.forEach((p) => {
        let opcionesHtml = '';
        let precioInicial = p.opciones && p.opciones.length > 0 ? p.opciones[0].precio : (p.precio || 0);
        
        if (p.opciones && p.opciones.length > 0) {
            p.opciones.forEach((opt) => {
                opcionesHtml += `<option value="${opt.precio}" data-cantidad="${opt.cantidad}">${opt.texto} - $${opt.precio.toLocaleString('es-CO')} COP</option>`;
            });
        } else {
            opcionesHtml += `<option value="${p.precio}">Precio único - $${p.precio.toLocaleString('es-CO')} COP</option>`;
        }

        const etiquetaCategoria = nombresCategorias[p.categoria] || p.categoria;

        html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 card-boutique">
                    <div class="product-img-wrapper">
                        <span class="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm">${etiquetaCategoria}</span>
                        <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600'">
                    </div>
                    <div class="card-body d-flex flex-column p-4">
                        <h5 class="fw-bold font-title text-dark mb-2">${p.nombre}</h5>
                        <p class="text-secondary small flex-grow-1">${p.descripcion || ''}</p>
                        
                        ${p.opciones && p.opciones.length > 1 ? `
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-dark">Elige presentación:</label>
                            <select class="form-select form-select-sm rounded-3 border-pink-sub" id="select-opcion-${p.id}" onchange="actualizarPrecioCard(${p.id})">
                                ${opcionesHtml}
                            </select>
                        </div>` : ''}

                        <div class="d-flex justify-content-between align-items-center mt-2 pt-3 border-top">
                            <div>
                                <small class="text-muted d-block">Precio</small>
                                <span class="fs-5 fw-bold text-dark" id="precio-card-${p.id}">$${precioInicial.toLocaleString('es-CO')} COP</span>
                            </div>
                            <button class="btn btn-boutique-action px-3 py-2" onclick="abrirPersonalizadorConOpcion(${p.id})">
                                Personalizar <i class="bi bi-arrow-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html || '<p class="text-center text-muted my-5">No hay productos en esta categoría por ahora 🌸</p>';
}

function actualizarPrecioCard(idProd) {
    const select = document.getElementById(`select-opcion-${idProd}`);
    const precioSpan = document.getElementById(`precio-card-${idProd}`);
    if (select && precioSpan) {
        const precioSeleccionado = Number(select.value);
        precioSpan.innerText = `$${precioSeleccionado.toLocaleString('es-CO')} COP`;
    }
}

function abrirPersonalizadorConOpcion(idProd) {
    const producto = productos.find(p => p.id === idProd);
    const select = document.getElementById(`select-opcion-${idProd}`);
    
    let precioElegido = producto.opciones && producto.opciones.length > 0 ? producto.opciones[0].precio : producto.precio;
    let textoPresentacion = producto.opciones && producto.opciones.length > 0 ? producto.opciones[0].texto : '';
    
    if (select) {
        precioElegido = Number(select.value);
        const selectedOption = select.options[select.selectedIndex];
        textoPresentacion = selectedOption.text.split(' - ')[0];
    }

    const nombreCompleto = textoPresentacion ? `${producto.nombre} (${textoPresentacion})` : producto.nombre;
    abrirPersonalizador(nombreCompleto, precioElegido);
}

function filtrar(e, cat) {
    document.querySelectorAll('.nav-pills-boutique .nav-link').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    renderizarProductos(cat);
}

// Funciones del Administrador
function guardarNuevoProducto(e) {
    e.preventDefault();
    const precioBase = Number(document.getElementById('nuevoPrecio').value);
    const nuevo = {
        id: Date.now(),
        nombre: document.getElementById('nuevoNombre').value,
        categoria: document.getElementById('nuevaCategoria').value,
        imagen: document.getElementById('nuevaImagen').value,
        descripcion: document.getElementById('nuevaDesc').value,
        opciones: [
            { cantidad: 1, texto: "Estándar", precio: precioBase }
        ]
    };

    productos.push(nuevo);
    localStorage.setItem('mundos_productos', JSON.stringify(productos));
    
    renderizarTablaAdmin();
    document.getElementById('formNuevoProducto').reset();
    alert("¡Producto creado y agregado al catálogo con éxito! ✨");
}

function renderizarTablaAdmin() {
    const tabla = document.getElementById('tabla-admin-productos');
    if(!tabla) return;

    let html = `
        <table class="table align-middle">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio Base</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    productos.forEach(p => {
        let precioMostrado = p.opciones && p.opciones.length > 0 ? p.opciones[0].precio : p.precio;
        const etiquetaCategoria = nombresCategorias[p.categoria] || p.categoria;
        html += `
            <tr>
                <td><strong>${p.nombre}</strong></td>
                <td><span class="badge bg-light text-dark border">${etiquetaCategoria}</span></td>
                <td>$${precioMostrado.toLocaleString('es-CO')}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${p.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    tabla.innerHTML = html;
}

function eliminarProducto(id) {
    if(confirm("¿Estás segura de eliminar este producto del catálogo?")) {
        productos = productos.filter(p => p.id !== id);
        localStorage.setItem('mundos_productos', JSON.stringify(productos));
        renderizarTablaAdmin();
    }
}

// Seguridad Admin
function solicitarClaveAdmin() {
    const modalEl = document.getElementById('modalPasswordAdmin');
    if (modalEl) {
        const myModal = new bootstrap.Modal(modalEl);
        myModal.show();
    }
}

function verificarPassword(e) {
    e.preventDefault();
    const passwordIngresada = document.getElementById('inputPasswordAdmin').value;
    const claveSecreta = "admin123"; 

    if (passwordIngresada === claveSecreta) {
        sessionStorage.setItem('adminAutenticado', 'true');
        window.open('admin.html', '_blank');
        document.getElementById('inputPasswordAdmin').value = '';
        const modalEl = document.getElementById('modalPasswordAdmin');
        if (modalEl) {
            bootstrap.Modal.getInstance(modalEl).hide();
        }
    } else {
        alert("❌ Contraseña incorrecta. Inténtalo de nuevo.");
        document.getElementById('inputPasswordAdmin').value = '';
    }
}

// Lógica de personalización y carrito
function seleccionarSabor(element, sabor) {
    document.querySelectorAll('.flavor-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    saborSeleccionado = sabor;
}

function abrirPersonalizador(nombre, precio) {
    productoActual = { nombre, precioBase: precio };
    const tituloModal = document.getElementById('modalProductoTitulo');
    if(tituloModal) tituloModal.innerText = `Personalizar: ${nombre}`;
    
    const textoTarjeta = document.getElementById('textoTarjeta');
    if(textoTarjeta) textoTarjeta.value = '';
    
    const precioTotal = document.getElementById('modalPrecioTotal');
    if(precioTotal) precioTotal.innerText = `$${precio.toLocaleString('es-CO')} COP`;

    const modalEl = document.getElementById('modalPersonalizar');
    if(modalEl) {
        const myModal = new bootstrap.Modal(modalEl);
        myModal.show();
    }
}

function agregarAlCarrito() {
    const fecha = document.getElementById('fechaEntrega').value;
    const tarjeta = document.getElementById('textoTarjeta').value;

    const item = {
        nombre: productoActual.nombre,
        precio: productoActual.precioBase,
        fecha: fecha,
        sabor: saborSeleccionado,
        tarjeta: tarjeta || 'Sin dedicatoria especial'
    };

    carrito.push(item);
    actualizarCarritoUI();
    
    const modalEl = document.getElementById('modalPersonalizar');
    if(modalEl) {
        bootstrap.Modal.getInstance(modalEl).hide();
    }
    alert("¡Detalle agregado al carrito con éxito! 🌸");
}

function actualizarCarritoUI() {
    const badge = document.getElementById('badge-count');
    if(badge) badge.innerText = carrito.length;
    
    const totalEl = document.getElementById('total-carrito');
    let total = carrito.reduce((sum, item) => sum + item.precio, 0);
    if(totalEl) totalEl.innerText = `$${total.toLocaleString('es-CO')} COP`;

    const lista = document.getElementById('lista-carrito');
    if(!lista) return;

    let html = '';
    carrito.forEach((item, index) => {
        html += `
            <div class="card border-0 bg-white mb-3 p-3 rounded-4 shadow-sm position-relative border">
                <button class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 m-2" onclick="eliminarItem(${index})">
                    <i class="bi bi-x-circle-fill fs-5"></i>
                </button>
                <h6 class="fw-bold text-dark mb-1">${item.nombre}</h6>
                <small class="text-dark fw-bold">$${item.precio.toLocaleString('es-CO')} COP</small>
                <div class="mt-2 text-muted small">
                    <div>📅 <strong>Entrega:</strong> ${item.fecha}</div>
                    <div>🍩 <strong>Sabor:</strong> ${item.sabor}</div>
                    ${item.tarjeta ? `<div class="fst-italic text-truncate mt-1">" ${item.tarjeta} "</div>` : ''}
                </div>
            </div>
        `;
    });

    lista.innerHTML = html || '<p class="text-muted text-center my-5">Tu bolsa de regalos está vacía 🌸</p>';
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

function enviarAWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu bolsa está vacía.");
        return;
    }

    let mensaje = "¡Hola *El Mundo de los Detalles*! 🌸 Quisiera realizar el siguiente pedido:\n\n";
    carrito.forEach((item, i) => {
        mensaje += `*Detalle #${i+1}: ${item.nombre}*\n`;
        mensaje += `• Fecha de entrega: ${item.fecha}\n`;
        mensaje += `• Sabor/Topping: ${item.sabor}\n`;
        mensaje += `• Dedicatoria: "${item.tarjeta}"\n`;
        mensaje += `• Subtotal: $${item.precio.toLocaleString('es-CO')} COP\n\n`;
    });

    let total = carrito.reduce((sum, item) => sum + item.precio, 0);
    mensaje += `*TOTAL ESTIMADO:* $${total.toLocaleString('es-CO')} COP\n\n`;
    mensaje += `Quedo atento(a) a los datos bancarios para realizar la transferencia. ¡Muchas gracias! ✨`;

    const url = `https://wa.me/573052201454?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
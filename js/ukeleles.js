const carritoArray = JSON.parse(localStorage.getItem("carritoStorage")) || []



document.addEventListener("DOMContentLoaded", () => {
    traerProductos()
    renderCarrito()
})

async function traerProductos() {
    const resp = await fetch("../ukeleles.json")
    const prods = await resp.json()
    renderProductos(prods)
}

function renderProductos(productos) {
    const divProductos = document.getElementById("contenedorDeUkeleles")
    divProductos.innerHTML = ""
    productos.forEach((producto) => {
        const contenedorProductos = document.createElement("div")
        contenedorProductos.classList.add("product__div")
        contenedorProductos.innerHTML = `
            <img src="${producto.imagen}">
            <div class="slider__product__info">
                            <h2>${producto.titulo}</h2>
                            <p>${producto.descripcion}</p>
                        </div>
                        <div class="slider__product__info__precio">
                            <p>Precio:</p>
                            <p class="slider__product__info__precio__color">$ ${producto.precio}</p>
                        </div>
            <button class="boton-agregar" id="${producto.id}">AGREGAR AL CARRITO</button>
            `
        divProductos.appendChild(contenedorProductos)
        const btnAgregar = document.getElementById(`${producto.id}`)
        btnAgregar.addEventListener("click", () => {
            productoAgregado(productos, producto.id)
        })
    })
}

function productoAgregado(productos, id) {
    const productoSeleccionado = productos.find(producto => producto.id === id)
    carritoArray.push(productoSeleccionado)
    localStorage.setItem("carritoStorage", JSON.stringify(carritoArray))

    Swal.fire({
        icon: 'success',
        text: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    renderCarrito()
}

function renderCarrito() {
    const carrito = document.getElementById("carrito")
    carrito.innerHTML = ""

    carritoArray.forEach((producto, index) => {
        const carritoDiv = document.createElement("div")
        carritoDiv.classList.add("items__carrito")
        carritoDiv.innerHTML = `
        <img src="${producto.imagen}">
            <div class="slider__product__info">
                            <h2>${producto.titulo}</h2>
                            <p>${producto.descripcion}</p>
                        </div>
                        <div class="slider__product__info__precio">
                            <p>Precio:</p>
                            <p class="slider__product__info__precio__color">$ ${producto.precio}</p>
                        </div>
        <button class="btn btn-danger" onclick="eliminarProducto(${index})">ELIMINAR</button>
        `
        carrito.appendChild(carritoDiv)

    })
    totalCarrito()
}

function totalCarrito() {
    let total = 0
    const totalCarrito = document.getElementById("total")

    carritoArray.forEach((producto) => {
        const preciosProducto = Number(producto.precio)
        total = total + preciosProducto


    })
    totalCarrito.innerHTML = `
        <p>Total AR$ ${total}</p>
        <button class="btn__comprar" onclick="realizarCompra()">Comprar</button>
        `
}

function eliminarProducto(index) {
    carritoArray.splice(index, 1)
    localStorage.setItem("carritoStorage", JSON.stringify(carritoArray))
    renderCarrito()
    totalCarrito()
}

function realizarCompra() {
    localStorage.removeItem("carritoStorage")
    carritoArray.length = 0
    Swal.fire({
        icon: 'success',
        title: 'Su pedido fue procesado',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    renderCarrito()
    totalCarrito()
}
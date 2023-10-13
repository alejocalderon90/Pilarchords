const carritoArray = JSON.parse(localStorage.getItem("carritoStorage")) || []



document.addEventListener("DOMContentLoaded", () => {
    traerProductosGuitarras()
    renderCarrito()
})

async function traerProductosGuitarras() {
    const resp = await fetch("../guitarras.json")
    const guitarras = await resp.json()
    renderProductosGuitarras(guitarras)
}

function renderProductosGuitarras(guitarras) {
    const divProductosGuitarras = document.getElementById("contenedorDeGuitarras")
    divProductosGuitarras.innerHTML = ""
    guitarras.forEach((guitarra) => {
        const contenedorProductosGuitarras = document.createElement("div")
        contenedorProductosGuitarras.classList.add("product__div")
        contenedorProductosGuitarras.innerHTML = `
            <img src="${guitarra.imagen}">
            <div class="slider__product__info">
                            <h2>${guitarra.titulo}</h2>
                            <p>${guitarra.descripcion}</p>
                        </div>
                        <div class="slider__product__info__precio">
                            <p>Precio:</p>
                            <p class="slider__product__info__precio__color">$ ${guitarra.precio}</p>
                        </div>
            <button class="boton-agregar" id="${guitarra.id}">AGREGAR AL CARRITO</button>
            `
        divProductosGuitarras.appendChild(contenedorProductosGuitarras)
        const btnAgregar = document.getElementById(`${guitarra.id}`)
        btnAgregar.addEventListener("click", () => {
            productoAgregadoGuitarra(guitarras, guitarra.id)
        })
    })
}

function productoAgregadoGuitarra(guitarras, id) {
    const productoSeleccionadoGuitarras = guitarras.find(guitarra => guitarra.id === id)
    carritoArray.push(productoSeleccionadoGuitarras)
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

    carritoArray.forEach((guitarra, index) => {
        const carritoDiv = document.createElement("div")
        carritoDiv.classList.add("items__carrito")
        carritoDiv.innerHTML = `
        <img src="${guitarra.imagen}">
            <div class="slider__product__info">
                            <h2>${guitarra.titulo}</h2>
                            <p>${guitarra.descripcion}</p>
                        </div>
                        <div class="slider__product__info__precio">
                            <p>Precio:</p>
                            <p class="slider__product__info__precio__color">$ ${guitarra.precio}</p>
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
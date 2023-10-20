document.addEventListener("DOMContentLoaded", () => {
    traerProductosGuitarras()
    renderCarrito()
})

async function traerProductosGuitarras() {
    const resp = await fetch("../guitarras.json")
    const prods = await resp.json()
    renderProductosGuitarras(prods)
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
        const btnAgregarGuitarra = document.getElementById(`${guitarra.id}`)
        btnAgregarGuitarra.addEventListener("click", () => {
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


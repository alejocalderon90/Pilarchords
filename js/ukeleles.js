document.addEventListener("DOMContentLoaded", () => {
    traerUkeleles()
    renderCarrito()
})

async function traerUkeleles() {
    const resp = await fetch("./ukeleles.json")
    const ukeleles = await resp.json()
    renderUkeleles(ukeleles)
}

function renderUkeleles(ukeleles) {
    const divUkeleles = document.getElementById("contenedorDeUkeleles")
    divUkeleles.innerHTML = ""
    ukeleles.forEach((ukelele) => {
        const contenedorUkeleles = document.createElement("div")
        contenedorUkeleles.classList.add("product__div")
        contenedorUkeleles.innerHTML = `
            <img src="${ukelele.imagen}">
            <div class="slider__product__info">
                            <h2>${ukelele.titulo}</h2>
                            <p>${ukelele.descripcion}</p>
                        </div>
                        <div class="slider__product__info__precio">
                            <p>Precio:</p>
                            <p class="slider__product__info__precio__color">$ ${ukelele.precio}</p>
                        </div>
            <button class="boton-agregar" id="${ukelele.id}">AGREGAR AL CARRITO</button>
            `
        divUkeleles.appendChild(contenedorUkeleles)
        const btnAgregarUkelele = document.getElementById(`${ukelele.id}`)
        btnAgregarUkelele.addEventListener("click", () => {
            ukeleleAgregado(ukeleles, ukelele.id)
        })
    })
}

function ukeleleAgregado(ukeleles, id) {
    const ukeleleSeleccionado = ukeleles.find(ukelele => ukelele.id === id)
    carritoArray.push(ukeleleSeleccionado)
    localStorage.setItem("carritoStorage", JSON.stringify(carritoArray))

    Swal.fire({
        icon: 'success',
        text: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    renderCarrito()
}


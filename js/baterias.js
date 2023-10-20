document.addEventListener("DOMContentLoaded", () => {
    traerBaterias()
    renderCarrito()
})

async function traerBaterias() {
    const resp = await fetch("../baterias.json")
    const baterias = await resp.json()
    renderBaterias(baterias)
}

function renderBaterias(baterias) {
    const divBaterias = document.getElementById("contenedorDeBaterias")
    divBaterias.innerHTML = ""
    baterias.forEach((bateria) => {
        const contenedorBaterias = document.createElement("div")
        contenedorBaterias.classList.add("product__div")
        contenedorBaterias.innerHTML = `
            <img src="${bateria.imagen}">
            <div class="slider__product__info">
                            <h2>${bateria.titulo}</h2>
                            <p>${bateria.descripcion}</p>
                        </div>
                        <div class="slider__product__info__precio">
                            <p>Precio:</p>
                            <p class="slider__product__info__precio__color">$ ${bateria.precio}</p>
                        </div>
            <button class="boton-agregar" id="${bateria.id}">AGREGAR AL CARRITO</button>
            `
        divBaterias.appendChild(contenedorBaterias)
        const btnAgregarBateria = document.getElementById(`${bateria.id}`)
        btnAgregarBateria.addEventListener("click", () => {
            bateriaAgregada(baterias, bateria.id)
        })
    })
}

function bateriaAgregada(baterias, id) {
    const bateriaSeleccionada = baterias.find(bateria => bateria.id === id)
    carritoArray.push(bateriaSeleccionada)
    localStorage.setItem("carritoStorage", JSON.stringify(carritoArray))

    Swal.fire({
        icon: 'success',
        text: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    renderCarrito()
}


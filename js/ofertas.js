document.addEventListener("DOMContentLoaded", () => {
    traerOfertas()
    renderCarrito()
})

async function traerOfertas() {
    const resp = await fetch("./ofertas.json")
    const ofertas = await resp.json()
    renderOfertas(ofertas)
}

function renderOfertas(ofertas) {
    const divOfertas = document.getElementById("sliderOfertas")
    divOfertas.innerHTML = ""
    ofertas.forEach((oferta) => {
        const contenedorDeOfertas = document.createElement("div")
        contenedorDeOfertas.classList.add("slider")
        contenedorDeOfertas.innerHTML = `
        <div class="slider__product">
                <a href=""><img src="${oferta.imagen}" alt="Auricular Shure Se215"></a>
                <div class="slider__product__info">
                    <h2>${oferta.titulo}</h2>
                    <p>${oferta.descripcion}</p>
                </div>
                <div class="slider__product__info__precio">
                    <p>Precio:</p>
                    <p class="slider__product__info__precio__color">$ ${oferta.precio}</p>
                </div>
                <button class="boton-agregar" id="${oferta.id}">AGREGAR AL CARRITO</button>
            </div>
        `
        divOfertas.appendChild(contenedorDeOfertas)
        const btnAgregarOferta = document.getElementById(`${oferta.id}`)
        btnAgregarOferta.addEventListener("click", () =>{
            ofertaAgregada(ofertas, oferta.id)
        })
    });
}

function ofertaAgregada(ofertas, id) {
    const ofertaSeleccionada = ofertas.find(oferta => oferta.id ===id)
    carritoArray.push(ofertaSeleccionada)
    localStorage.setItem("carritoStorage", JSON.stringify(carritoArray))

    Swal.fire({
        icon: 'success',
        text: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    renderCarrito()
}
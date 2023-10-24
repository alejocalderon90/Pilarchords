let sliderContainer = document.getElementById("sliderOfertas")
let slides = document.querySelectorAll(".slider")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")

let sliderIndex = 1

prevButton.addEventListener("click", (prev))
nextButton.addEventListener("click", (next))

function prev() {
    sliderContainer.style.transform = `translateX(${sliderIndex * 50}%)`
}

function next() {
    sliderContainer.style.transform = `translateX(-${sliderIndex * 50}%)`
}


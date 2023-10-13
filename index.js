const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = document.querySelectorAll('.slider__product');

let slideIndex = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

prevButton.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlider();
});


nextButton.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlider();
});





















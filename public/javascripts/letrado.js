//Obtener los botones y las secciones
const section1Btn = document.getElementById('section1-btn');
const section2Btn = document.getElementById('section2-btn');
const section3Btn = document.getElementById('section3-btn');
const section4Btn = document.getElementById('section4-btn');

const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');

// Mostrar la primera sección
section1.style.display = 'block';

// Agregar eventos a los botones
section1Btn.addEventListener('click', function() {
  section1.style.display = 'block';
  section2.style.display = 'none';
  section3.style.display = 'none';
  section4.style.display = 'none';
});

section2Btn.addEventListener('click', function() {
  section1.style.display = 'none';
  section2.style.display = 'block';
  section3.style.display = 'none';
  section4.style.display = 'none';
});

section3Btn.addEventListener('click', function() {
  section1.style.display = 'none';
  section2.style.display = 'none';
  section3.style.display = 'block';
  section4.style.display = 'none';
});

section4Btn.addEventListener('click', function() {
  section1.style.display = 'none';
  section2.style.display = 'none';
  section3.style.display = 'none';
  section4.style.display = 'block';
});

//Menú desplegable
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

cerrar.addEventListener("click", () => {
  nav.classList.remove("visibles");
})

abrir.addEventListener("click", () => {
    nav.classList.add("visibles");
})


document.addEventListener('DOMContentLoaded', () => {
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const menuPersonajes = document.getElementById('menu-personajes');
    const enfrentamiento = document.getElementById('enfrentamiento');

    const btnIniciar = document.getElementById('btn-iniciar');
    const btnIniciarEnfrentamiento = document.getElementById('btn-iniciar-enfrentamiento');
    const botonesPersonajes = document.querySelectorAll('.btn-personaje');
    const botonesPersonajes2 = document.querySelectorAll('.btn-personaje[id^="btn"]');
    const imgDisplayJugador1 = document.getElementById('imagen-personaje1') ? document.getElementById('imagen-personaje1').querySelector('img') : null;
    const imgDisplayJugador2 = document.getElementById('imagen-personaje2') ? document.getElementById('imagen-personaje2').querySelector('img') : null;
    let personajeJugador1 = null;
    let personajeJugador2 = null;

    function mostrarSeccion(seccion) {
        pantallaInicial.style.display = 'none';
        menuPersonajes.style.display = 'none';
        enfrentamiento.style.display = 'none';
        seccion.style.display = 'flex';
    }

    btnIniciar.addEventListener('click', () => {
        mostrarSeccion(menuPersonajes);
    });

    botonesPersonajes.forEach((boton) => {
        boton.addEventListener('click', () => {
            if (boton.id === 'btnGg') {
                imgDisplayJugador1.src = 'img/personajes/gg.png';
                personajeJugador1 = 'gg';
            } else if (boton.id === 'btnPajares') {
                imgDisplayJugador1.src = 'img/personajes/pajares.png';
                personajeJugador1 = 'pajares';
            } else if (boton.id === 'btnNimas') {
                imgDisplayJugador1.src = 'img/personajes/nimas.png';
                personajeJugador1 = 'nimas';
            } else if (boton.id === 'btnMauri') {
                imgDisplayJugador1.src = 'img/personajes/mauri.png';
                personajeJugador1 = 'mauri';
            } else if (boton.id === 'btnEmi') {
                imgDisplayJugador1.src = 'img/personajes/emi.png';
                personajeJugador1 = 'emi';
            }

            if (personajeJugador1 && personajeJugador2) {
                btnIniciarEnfrentamiento.style.display = 'block';
            }
        });
    });

    botonesPersonajes2.forEach((boton) => {
        boton.addEventListener('click', () => {
            if (boton.id === 'btnGg2') {
                imgDisplayJugador2.src = 'img/personajes/gg.png';
                personajeJugador2 = 'gg';
            } else if (boton.id === 'btnPajares2') {
                imgDisplayJugador2.src = 'img/personajes/pajares.png';
                personajeJugador2 = 'pajares';
            } else if (boton.id === 'btnNimas2') {
                imgDisplayJugador2.src = 'img/personajes/nimas.png';
                personajeJugador2 = 'nimas';
            } else if (boton.id === 'btnMauri2') {
                imgDisplayJugador2.src = 'img/personajes/mauri.png';
                personajeJugador2 = 'mauri';
            } else if (boton.id === 'btnEmi2') {
                imgDisplayJugador2.src = 'img/personajes/emi.png';
                personajeJugador2 = 'emi';
            }

            if (personajeJugador1 && personajeJugador2) {
                btnIniciarEnfrentamiento.style.display = 'block';
            }
        });
    });

    btnIniciarEnfrentamiento.addEventListener('click', () => {
        if (personajeJugador1) {
            document.getElementById('img-jugador1').src = `img/personajes/${personajeJugador1}.png`;
        }
        if (personajeJugador2) {
            document.getElementById('img-jugador2').src = `img/personajes/${personajeJugador2}.png`;
        }
        mostrarSeccion(enfrentamiento);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const fondos = [
        "default",
        "esi.png",
        "plaza_independencia.png",
        "palacio_legislativo.png",
        "plaza_independencia.png",
    ];
    let currentIndex = 0;

    const imagenFondo = document.getElementById("imagen-fondo");
    const enfrentamientoContenedor = document.getElementById("enfrentamiento-contenedor");
    const btnPrev = document.getElementById("prev");
    const btnNext = document.getElementById("next");

    function actualizarFondo() {
        const fondoActual = fondos[currentIndex];
        imagenFondo.src = fondoActual === "default" ? "/img/fondos/default.png" : `/img/fondos/${fondoActual}`;
        enfrentamientoContenedor.style.backgroundImage =
            fondoActual === "default" ? "" : `url(/img/fondos/${fondoActual})`;
    }

    btnPrev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + fondos.length) % fondos.length;
        actualizarFondo();
    });

    btnNext.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % fondos.length;
        actualizarFondo();
    });

    actualizarFondo();
});

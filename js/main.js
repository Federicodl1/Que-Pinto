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

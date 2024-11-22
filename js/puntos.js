let vidaJugador1 = 100;
let vidaJugador2 = 100;
let juegoTerminado = false;

function actualizarBarraDeVida(jugador, vida) {
    const barra = document.getElementById(`barra-vida-${jugador}`);
    barra.style.width = `${vida}%`;
    barra.style.backgroundColor = vida > 50 ? "green" : vida > 20 ? "orange" : "red";
}

function calcularDanio(insulto) {
    return insulto.length;
}

function aplicarDanio(jugador, insulto) {
    if (juegoTerminado) return;

    const danio = calcularDanio(insulto);
    if (jugador === 1) {
        vidaJugador2 = Math.max(vidaJugador2 - danio * 100, 0);
        actualizarBarraDeVida(2, vidaJugador2);
        if (vidaJugador2 <= 0) {
            alert("Jugador 1 gana");
            const pantallaInicial = document.getElementById('pantalla-inicial');
            const menuPersonajes = document.getElementById('menu-personajes');
            const enfrentamiento = document.getElementById('enfrentamiento');
            pantallaInicial.style.display = 'flex';
            menuPersonajes.style.display = 'none';
            enfrentamiento.style.display = 'none';
        }
    } else {
        vidaJugador1 = Math.max(vidaJugador1 - danio, 0);
        actualizarBarraDeVida(1, vidaJugador1);
        if (vidaJugador1 <= 0) {
            alert("Jugador 2 gana");
            const pantallaInicial = document.getElementById('pantalla-inicial');
            const menuPersonajes = document.getElementById('menu-personajes');
            const enfrentamiento = document.getElementById('enfrentamiento');
            pantallaInicial.style.display = 'flex';
            menuPersonajes.style.display = 'none';
            enfrentamiento.style.display = 'none';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("insultarP1").addEventListener("click", () => {
        const insulto = obtenerInsultoJugador1();
        if (insulto) {
            aplicarDanio(1, insulto);
        }
    });

    document.getElementById("insultarP2").addEventListener("click", () => {
        const insulto = obtenerInsultoJugador2();
        if (insulto) {
            aplicarDanio(2, insulto);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let vidaJugador1 = 100;
    let vidaJugador2 = 100;

    const barraVida1 = document.getElementById('barra-vida-1');
    const barraVida2 = document.getElementById('barra-vida-2');
    const btnInsultarP1 = document.getElementById('insultarP1');
    const btnInsultarP2 = document.getElementById('insultarP2');
    
    function actualizarBarraVida() {
        barraVida1.style.width = `${vidaJugador1}%`;
        barraVida2.style.width = `${vidaJugador2}%`;

        if (vidaJugador1 <= 0) {
            alert('¡Jugador 2 ha ganado!');
            reiniciarJuego();
        } else if (vidaJugador2 <= 0) {
            alert('¡Jugador 1 ha ganado!');
            reiniciarJuego();
        }
    }

    function reiniciarJuego() {
        vidaJugador1 = 100;
        vidaJugador2 = 100;
        actualizarBarraVida();
    }

    btnInsultarP1.addEventListener('click', () => {
        if (palabrasJugador1.length > 0) {
            vidaJugador2 -= 6;
            vidaJugador2 -= 3;
            actualizarBarraVida();
        }
    });

    btnInsultarP2.addEventListener('click', () => {
        if (palabrasJugador2.length > 0) {
            vidaJugador1 -= 6;
            vidaJugador1 -= 3;
            actualizarBarraVida();
        }
    });

    actualizarBarraVida();
});

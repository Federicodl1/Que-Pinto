let frasesGeneradas = [];
let turno = 1;
let palabrasJugador1 = [];
let palabrasJugador2 = [];
let bloqueadoJugador1 = false;
let bloqueadoJugador2 = false;

function generarInsultos(data) {
  const ataqueMasculinos = getRandomItems(data.sujetos.ataque.masculinos.singular, 1);
  const ataqueFemeninos = getRandomItems(data.sujetos.femeninos.singular, 1);
  const normalesMasculinos = getRandomItems(data.sujetos.masculinos.singular, 1);
  const normalesFemeninos = getRandomItems(data.sujetos.femeninos.singular, 1);

  const ataque = [...ataqueMasculinos, ...ataqueFemeninos];
  const normales = [...normalesMasculinos, ...normalesFemeninos];
  const sujetos = [
    ...getRandomItems(ataque, 2),
    ...getRandomItems(normales, 2)
  ];

  const insultos = getRandomItems(data.insultos, 4);
  const conectores = getRandomItems(data.conectores, 4);
  return [...sujetos, ...insultos, ...conectores].sort(() => 0.5 - Math.random());
}

function cargarFrases() {
  fetch("../data/frases.json")
    .then(response => response.json())
    .then(data => {
      frasesGeneradas = generarInsultos(data);
      iniciarTurnoJugador1();
    })
    .catch(error => console.error("Error al cargar el archivo JSON:", error));
}

function actualizarFrasesJugador(jugador, frase) {
  if (jugador === 1) {
    palabrasJugador1.push(frase);
    document.getElementById("frases-p1").textContent = palabrasJugador1.join(" ");
  } else {
    palabrasJugador2.push(frase);
    document.getElementById("frases-p2").textContent = palabrasJugador2.join(" ");
  }
}

function iniciarTurnoJugador1() {
  const zonaInsultos = document.getElementById("zona-insultos");
  if (!zonaInsultos) return;

  zonaInsultos.innerHTML = "";
  frasesGeneradas.forEach(elemento => {
    const li = document.createElement("li");
    li.textContent = elemento;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      if (!bloqueadoJugador1 && li.textContent !== "...") {
        li.textContent = "...";
        actualizarFrasesJugador(1, elemento);
        bloqueadoJugador1 = true;
        bloqueadoJugador2 = false;
        iniciarTurnoJugador2();
      }
    });
    zonaInsultos.appendChild(li);
  });
}

function iniciarTurnoJugador2() {
  const zonaInsultos = document.getElementById("zona-insultos");
  if (!zonaInsultos) return;

  zonaInsultos.innerHTML = "";
  frasesGeneradas.forEach(elemento => {
    const li = document.createElement("li");
    li.textContent = elemento;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      if (!bloqueadoJugador2 && li.textContent !== "...") {
        li.textContent = "...";
        actualizarFrasesJugador(2, elemento);
        bloqueadoJugador2 = true;
        bloqueadoJugador1 = false;
        iniciarTurnoJugador1();
      }
    });
    zonaInsultos.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-iniciar-enfrentamiento").addEventListener("click", () => {
    cargarFrases();
  });

  document.getElementById("insultarP1").addEventListener("click", () => {
    if (palabrasJugador1.length > 0) {
      alert("Insulto formulado: " + palabrasJugador1.join(" "));
      bloqueadoJugador1 = true;
      document.getElementById("frases-p1").textContent = "";
      fetch("../data/frases.json")
      .then(response => response.json())
      .then(data => {
        frasesGeneradas = generarInsultos(data);
        bloqueadoJugador2 = false;
        palabrasJugador1 = [];
        iniciarTurnoJugador2();
      })
    }
  });

  document.getElementById("insultarP2").addEventListener("click", () => {
    if (palabrasJugador2.length > 0) {
      alert("Insulto formulado: " + palabrasJugador2.join(" "));
      bloqueadoJugador2 = true;
      document.getElementById("frases-p2").textContent = "";
      fetch("../data/frases.json")
      .then(response => response.json())
      .then(data => {
        frasesGeneradas = generarInsultos(data);
        bloqueadoJugador1 = false;
        palabrasJugador2 = [];
        iniciarTurnoJugador1();
      })
    }
  });
});

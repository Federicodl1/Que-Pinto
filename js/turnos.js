let frasesGeneradas = [];
let turno = 1;
let palabrasJugador1 = [];
let palabrasJugador2 = [];
let bloqueadoJugador1 = false;
let bloqueadoJugador2 = false;

function getRandomItems(array, cantidad) {
  const resultados = [];
  for (let i = 0; i < cantidad; i++) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    resultados.push(array[indiceAleatorio]);
  }
  return resultados;
}

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
    if (!palabrasJugador1.includes(frase)) {
      palabrasJugador1.push(frase);
    }
    const frasesP1 = document.getElementById("frases-p1");
    frasesP1.textContent = palabrasJugador1.join(" ");
    frasesP1.textContent = frasesP1.textContent.charAt(0).toUpperCase() + frasesP1.textContent.slice(1);
  } else {
    if (!palabrasJugador2.includes(frase)) {
      palabrasJugador2.push(frase);
    }
    const frasesP2 = document.getElementById("frases-p2");
    frasesP2.textContent = palabrasJugador2.join(" ");
    frasesP2.textContent = frasesP2.textContent.charAt(0).toUpperCase() + frasesP2.textContent.slice(1);
  }
}

function asignarFrases() {
  const zonaInsultos = document.getElementById("zona-insultos");
  if (!zonaInsultos) return;

  for (let i = 0; i < 12; i++) {
    let li = document.getElementById(`frase${i + 1}`);
    if (!li) { 
      li = document.createElement("li");
      li.id = `frase${i + 1}`;
      zonaInsultos.appendChild(li);
    }
    if (frasesGeneradas[i]) {
      li.textContent = frasesGeneradas[i];
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        if ((turno === 1 && !bloqueadoJugador1) || (turno === 2 && !bloqueadoJugador2)) {
          const fraseSeleccionada = li.textContent;
          li.textContent = "...";

          if (turno === 1) {
            actualizarFrasesJugador(1, fraseSeleccionada);
            bloqueadoJugador1 = true;
            bloqueadoJugador2 = false;
            iniciarTurnoJugador2();
          } else {
            actualizarFrasesJugador(2, fraseSeleccionada);
            bloqueadoJugador2 = true;
            bloqueadoJugador1 = false;
            iniciarTurnoJugador1();
          }
        }
      });
    }
  }
}

function iniciarTurnoJugador1() {
  const zonaInsultos = document.getElementById("zona-insultos");
  if (!zonaInsultos) return;

  document.getElementById("insultarP1").disabled = false;
  document.getElementById("insultarP2").disabled = true;
  document.getElementById("frases-p2").style.backgroundColor = "#d3d3d3"; 
  document.getElementById("frases-p1").style.backgroundColor = "white"; 
  document.getElementById("img-jugador1").style.backgroundColor = "rgba(0, 2, 150, 0.233)";
  document.getElementById("img-jugador2").style.backgroundColor = "";
  turno = 1;

  zonaInsultos.innerHTML = "";
  asignarFrases();
}

function iniciarTurnoJugador2() {
  const zonaInsultos = document.getElementById("zona-insultos");
  if (!zonaInsultos) return;

  document.getElementById("insultarP1").disabled = true;
  document.getElementById("insultarP2").disabled = false;
  document.getElementById("frases-p2").style.backgroundColor = "white";
  document.getElementById("frases-p1").style.backgroundColor = "#d3d3d3";
  document.getElementById("img-jugador2").style.backgroundColor = "rgba(0, 2, 150, 0.233)";
  document.getElementById("img-jugador1").style.backgroundColor = "";

  turno = 2;

  zonaInsultos.innerHTML = "";
  asignarFrases();
}

function obtenerInsultoJugador1() {
  return palabrasJugador1.join(" ");
}

function obtenerInsultoJugador2() {
  return palabrasJugador2.join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-iniciar-enfrentamiento").addEventListener("click", () => {
    cargarFrases();
  });

  document.getElementById("insultarP1").addEventListener("click", () => {
    if (palabrasJugador1.length > 0) {
      alert("Jugador 1: " + palabrasJugador1.join(" "));
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
      alert("Jugador 2: " + palabrasJugador2.join(" "));
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

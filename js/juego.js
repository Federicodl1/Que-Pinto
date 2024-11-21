function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  function generarInsultosDesdeJson() {
    const zonaInsultos = document.getElementById("zona-insultos");
    if (!zonaInsultos) return;
  
    fetch("../data/frases.json")
      .then(response => response.json())
      .then(data => {
        const ataqueMasculinos = getRandomItems(data.sujetos.ataque.masculinos.singular, 1);
        const ataqueFemeninos = getRandomItems(data.sujetos.ataque.femeninos.singular, 1);
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
  
        const elementos = [...sujetos, ...insultos, ...conectores].sort(() => 0.5 - Math.random());
  
        zonaInsultos.innerHTML = "";
        elementos.forEach(elemento => {
          const li = document.createElement("li");
          li.textContent = elemento;
          zonaInsultos.appendChild(li);
        });
      })
      .catch(error => console.error("Error al cargar el archivo JSON:", error));
  }
  
  document.addEventListener("DOMContentLoaded", generarInsultosDesdeJson);
  
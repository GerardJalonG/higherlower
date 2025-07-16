import { countries } from "./countries.js";

let leftCountryIndex = Math.floor(Math.random() * countries.length);
let rightCountryIndex = getRandomIndexExcept(leftCountryIndex);
let score = 0;
let highscore = 0;

function getRandomIndexExcept(exceptIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * countries.length);
  } while (idx === exceptIndex);
  return idx;
}

async function getCountryData(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
}

async function renderGame(leftIdx, rightIdx) {
  const leftData = await getCountryData(countries[leftIdx]);
  const rightData = await getCountryData(countries[rightIdx]);

  const banderaIzq = leftData.flags.svg;
  const nombreIzq = leftData.name.common;
  const poblacionIzq = leftData.population;
  const poblacionIzqS = leftData.population.toLocaleString("es-ES");

  const banderaDer = rightData.flags.svg;
  const nombreDer = rightData.name.common;
  const poblacionDer = rightData.population;
  const poblacionDerS = rightData.population.toLocaleString("es-ES");

  result.innerHTML = `
    <div class="score-bar">
      Puntuación: <b>${score}</b> | Récord: <b>${highscore}</b>
    </div>
    <div class="divIzq" style="background-image: url(${banderaIzq});">
      <div> 
        <div class="nombre">${nombreIzq}</div>
        <div class="poblacion">${poblacionIzqS} habitantes</div>
      </div>
    </div>
    <div class="divDer" style="background-image: url(${banderaDer});">
      <div> 
        <div class="nombre">${nombreDer}</div>
        <button class="btn" id="btnIzq">Menos</button>
        <button class="btn" id="btnDer">Más</button>
      </div>
    </div>
  `;

  document.getElementById("btnIzq").addEventListener("click", () => handleGuess(false, leftIdx, rightIdx));
  document.getElementById("btnDer").addEventListener("click", () => handleGuess(true, leftIdx, rightIdx));
}

async function handleGuess(isRightBtn, leftIdx, rightIdx) {
  const leftData = await getCountryData(countries[leftIdx]);
  const rightData = await getCountryData(countries[rightIdx]);
  const divDer = document.querySelector(".divDer");
  let correct;
  if (isRightBtn) {
    correct = rightData.population > leftData.population;
  } else {
    correct = rightData.population <= leftData.population;
  }
  if (correct) {
    score++;
    if (score > highscore) highscore = score;
    divDer.style.border = "10px solid green";
    divDer.style.transition = "border 0.5s, opacity 0.75s";
    divDer.style.opacity = "1";
    setTimeout(() => {
      divDer.style.opacity = "0.5";
      setTimeout(async () => {
        divDer.style.border = "none";
        divDer.style.opacity = "1";
        if (isRightBtn) {
          leftCountryIndex = rightCountryIndex;
        }
        rightCountryIndex = getRandomIndexExcept(leftCountryIndex);
        await renderGame(leftCountryIndex, rightCountryIndex);
      }, 500);
    }, 500);
  } else {
    score = 0;
    divDer.style.border = "10px solid red";
    divDer.style.transition = "border 0.5s, opacity 0.75s";
    divDer.style.opacity = "1";
    setTimeout(() => {
      divDer.style.opacity = "0.5";
      setTimeout(async () => {
        divDer.style.border = "none";
        divDer.style.opacity = "1";
        leftCountryIndex = Math.floor(Math.random() * countries.length);
        rightCountryIndex = getRandomIndexExcept(leftCountryIndex);
        await renderGame(leftCountryIndex, rightCountryIndex);
      }, 500);
    }, 500);
  }
}

renderGame(leftCountryIndex, rightCountryIndex);

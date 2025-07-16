import { countries } from "./countries.js";

let leftCountryIndex = Math.floor(Math.random() * countries.length);
let rightCountryIndex = getRandomIndexExcept(leftCountryIndex);
let score = 0;
let highscore = 0;
let leftStreak = 0;
let lastLeftCountry = leftCountryIndex;

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

async function renderGame(leftIdx, rightIdx, showFailInfo = false, failInfo = {}) {
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

  let failHtml = "";
  if (showFailInfo) {
    failHtml = `<div class='fail-info' style='color:red; font-size:2rem; text-align:center; margin:2rem 0;'>${failInfo.poblacionDerS} habitantes</div>`;
  }

  result.innerHTML = `
    <div class="score-bar">
      Puntuación: <b>${score}</b> | Récord: <b>${highscore}</b>
    </div>
    ${failHtml}
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

  if (!showFailInfo) {
    document.getElementById("btnIzq").addEventListener("click", () => handleGuess(false, leftIdx, rightIdx));
    document.getElementById("btnDer").addEventListener("click", () => handleGuess(true, leftIdx, rightIdx));
  }
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
    // streak logic
    if (leftCountryIndex === lastLeftCountry) {
      leftStreak++;
    } else {
      leftStreak = 1;
      lastLeftCountry = leftCountryIndex;
    }
    // Si el país izquierdo se repite más de 2 veces, cambia por otro
    if (leftStreak > 2) {
      leftCountryIndex = getRandomIndexExcept(rightCountryIndex);
      leftStreak = 1;
      lastLeftCountry = leftCountryIndex;
    }
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
    leftStreak = 1;
    lastLeftCountry = leftCountryIndex;
    divDer.style.border = "10px solid red";
    divDer.style.transition = "border 0.5s, opacity 0.75s";
    divDer.style.opacity = "1";
    setTimeout(() => {
      divDer.style.opacity = "0.5";
      setTimeout(async () => {
        divDer.style.border = "none";
        divDer.style.opacity = "1";
        // Mostrar los habitantes debajo del nombre
        divDer.innerHTML = `
      <div style='display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%;'>
        <div class='nombre' style='margin-bottom: 1rem;'>${rightData.name.common}</div>
        <div class='poblacion' style='color:white; font-size:2rem;'>${rightData.population.toLocaleString("es-ES")} habitantes</div>
      </div>
    `;
        setTimeout(async () => {
          leftCountryIndex = Math.floor(Math.random() * countries.length);
          rightCountryIndex = getRandomIndexExcept(leftCountryIndex);
          await renderGame(leftCountryIndex, rightCountryIndex);
        }, 3000);
      }, 500);
    }, 500);
  }
}

renderGame(leftCountryIndex, rightCountryIndex);

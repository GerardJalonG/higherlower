import { countries } from "./countries.js";

const randomNumber = Math.floor(Math.random() * 191) + 1;
const random2 = Math.floor(Math.random() * 191) + 1;

if (randomNumber === random2) {
  random2 = (randomNumber + 1) % 191;
}

const paiszizq = countries[randomNumber];
const paisder = countries[random2];


async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function printData() {
  const urlIzq = `https://restcountries.com/v3.1/name/${paiszizq}`;
  const dataIzq = await getData(urlIzq);
  const banderaIzq = dataIzq[0].flags.svg;
  const nombreIzq = dataIzq[0].name.common;
  const poblacionIzq = dataIzq[0].population.toLocaleString("es-ES");

  const urlDer = `https://restcountries.com/v3.1/name/${paisder}`;
  const dataDer = await getData(urlDer);
  const banderaDer = dataDer[0].flags.svg;
  const nombreDer = dataDer[0].name.common;
  const poblacionDer = dataDer[0].population.toLocaleString("es-ES");


  result.innerHTML = `
    <div class="divIzq" style="background-image: url(${banderaIzq});">
      <div> 
        <div class="nombre">${nombreIzq}</div>
        <div class="poblacion">${poblacionIzq} habitantes</div>
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
  console.log("Población Izquierda: ", poblacionIzq);
  console.log("Población Derecha: ", poblacionDer);
    
  document.getElementById("btnIzq").addEventListener("click", () => {
    console.log("Botón Izquierdo presionado");
    if (poblacionIzq > poblacionDer) {
      console.log("Correcto!");
    } else {
      console.log("Incorrecto!");
    }
  });

  document.getElementById("btnDer").addEventListener("click", () => {
    console.log("Botón Derecho presionado");
    if (poblacionIzq < poblacionDer) {
      console.log("Correcto!");
    } else {
      console.log("Incorrecto!");
    }
  });
}

printData();

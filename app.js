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

  const urlDer = `https://restcountries.com/v3.1/name/${paisder}`;
  const dataDer = await getData(urlDer);
  const banderaDer = dataDer[0].flags.svg;


  result.innerHTML = `
    <div>
      <div class="divIzq" style="background-image: url(${banderaIzq});">
      </div>
      <div class="divDer" style="background-image: url(${banderaDer});">
      </div>
    </div>
  `;
}

printData();

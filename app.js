import { countries } from "./countries.js";

const randomNumber = Math.floor(Math.random() * 191) + 1;
const random2 = Math.floor(Math.random() * 191) + 1;
console.log(randomNumber);

const paiszizq = countries[randomNumber];
const paisder = countries[random2];

console.log(paiszizq);

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const url = `https://restcountries.com/v3.1/name/${paiszizq}`;
console.log(url);
const text = getData(url);
console.log(text);

async function printData() {
  const data = await getData(url);
  const bandera = data[0].flags.svg;
  const poblacion = data[0].population.toLocaleString();
  const lenguajes = Object.values(data[0].languages).join(", ");
  const currency = Object.keys(data[0].currencies)[0];

  result.innerHTML = `
    <img class="bandera" src="${bandera}""><br>
    `;
}
printData();

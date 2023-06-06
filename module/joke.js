import {Joke} from './api.js'

  function shows(chiste) {
    const chisteContainer = document.getElementById("chiste");
    chisteContainer.innerHTML = "";
  
    const link = document.createElement("a");
    link.textContent = chiste;
    link.href = `product.html?id=${chiste.Id}`;
  
    chisteContainer.appendChild(link);
  }
  
  export function Chiste() {
    Joke()
      .then((chiste) =>  shows(chiste));
  }
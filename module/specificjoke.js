import { specificjoke } from "./api.js";

function show(chistes) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (chistes && chistes.length > 0) {
    chistes.forEach((chiste) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `product.html?id=${chiste.id}`;
      link.textContent = chiste.joke;
      listItem.appendChild(link);
      lista.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = "No hay resultados";
    lista.appendChild(listItem);
  }
}

export function Chistes() {
  const input = document.getElementById("input");
  const keyword = input.value.trim();

  specificjoke(keyword)
    .then((chistes) => show(chistes));

  input.value = "";
}
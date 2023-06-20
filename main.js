import { date, price, location } from './src/formato.js';
import { cache } from './src/cache.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');

  const cargar = async (category) => {
    const eventos = cache[category] || await data(category);
    render(eventos);
  };

  const data = async (category) => {
    try {
      const response = await fetch(`https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`);
      if (!response.ok) {
        throw new Error('Error');
      }
      const eventos = await response.json();
      cache[category] = eventos;
      return eventos;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const render = (events) => {
    grid.innerHTML = '';
    events.forEach(evento => {
      const elemento = elmento(evento);
      grid.appendChild(elemento);
    });
  };

  const elmento = (event) => {
    const elemento = document.createElement('div');
    elemento.classList.add('event');

    const fecha = date(new Date(event.date));
    const precio = price(event.price);
    const lugar = location(event.location);

    elemento.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <h3>${event.title}</h3>
      <p>Date: ${fecha}</p>
      <p>Location: ${lugar}</p>
      <p>Price: ${precio}</p>
    `;

    return elemento;
  };

  const tabs = document.querySelectorAll('.div-tab');
  tabs.forEach(tab => {
    const category = tab.id
    tab.addEventListener('click', () => cargar(category));
  });
});
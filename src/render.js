import { date, price, location } from './formato.js';
import { AppState } from './appState.js';

export function renderEvents(events, createElement) {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  events.forEach(evento => {
    const elemento = createElement(evento);
    grid.appendChild(elemento);
  });
}

export function createEventElement(event) {
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
    <button class="remove-button">Remove</button>
  `;

  const removeButton = elemento.querySelector('.remove-button');
  if (removeButton) {
    removeButton.addEventListener('click', () => removeEventFromList(event));
  }

  return elemento;
}

export function removeEventFromList(event) {
  const appState = AppState.getInstance();

  const favorites = appState.getFavorites();
  const interested = appState.getInterested();
  const going = appState.getGoing();

  // Remueve el evento de la lista correspondiente
  if (favorites.includes(event)) {
    const updatedFavorites = favorites.filter(e => e !== event);
    appState.setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } else if (interested.includes(event)) {
    const updatedInterested = interested.filter(e => e !== event);
    appState.setInterested(updatedInterested);
    localStorage.setItem('interested', JSON.stringify(updatedInterested));
  } else if (going.includes(event)) {
    const updatedGoing = going.filter(e => e !== event);
    appState.setGoing(updatedGoing);
    localStorage.setItem('going', JSON.stringify(updatedGoing));
  }

  // Vuelve a mostrar la cuadrícula actualizada
  const activeTab = document.querySelector('.tab.active');
  const tabId = activeTab.id;

  if (tabId === 'favorites-tab') {
    showFavorites();
  } else if (tabId === 'interested-tab') {
    showInterested();
  } else if (tabId === 'going-tab') {
    showGoing();
  }
}
import { date, price, location } from './src/formato.js';
import { cache } from './src/cache.js';
import { AppState } from './src/appState.js';
import { renderEvents, createEventElement, removeEventFromList } from './src/render.js';

const appState = AppState.getInstance();

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');

  const cargar = async (category) => {
    const eventos = cache[category] || await data(category);
    renderEvents(eventos, createElement);
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

  const createElement = (event) => {
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
      <button class="favorite-button">Favorite</button>
      <button class="interested-button">Interested</button>
      <button class="going-button">Going!</button>
    `;

    const favoriteButton = elemento.querySelector('.favorite-button');
    const interestedButton = elemento.querySelector('.interested-button');
    const goingButton = elemento.querySelector('.going-button');

    favoriteButton.addEventListener('click', () => toggleFavorite(event));
    interestedButton.addEventListener('click', () => toggleInterested(event));
    goingButton.addEventListener('click', () => toggleGoing(event));

    return elemento;
  };

  const toggleFavorite = (event) => {
    const favorites = appState.getFavorites();

    // Verificar si el evento ya está en la lista de favoritos
    const index = favorites.findIndex(fav => fav.id === event.id);

    if (index !== -1) {
      // Si el evento ya está en la lista, se elimina
      favorites.splice(index, 1);
    } else {
      // Si el evento no está en la lista, se agrega
      favorites.push(event);
    }

    // Actualizar el estado de favoritos
    appState.setFavorites(favorites);
    // Guardar la lista de favoritos actualizada en el local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const toggleInterested = (event) => {
    const interested = appState.getInterested();
    const going = appState.getGoing();

    // Verificar si el evento ya está en la lista de interesados
    const index = interested.findIndex(int => int.id === event.id);

    if (index !== -1) {
      // Si el evento ya está en la lista de interesados, se elimina
      interested.splice(index, 1);
    } else {
      // Si el evento no está en la lista de interesados

      // Verificar si el evento ya está en la lista de "Going"
      const goingIndex = going.findIndex(g => g.id === event.id);
      if (goingIndex !== -1) {
        // Si el evento ya está en la lista de "Going", se elimina de esa lista
        going.splice(goingIndex, 1);
      }

      // Se agrega el evento a la lista de interesados
      interested.push(event);
    }

    // Actualizar el estado de interesados y asistencias
    appState.setInterested(interested);
    appState.setGoing(going);

    // Guardar las listas actualizadas en el local storage
    localStorage.setItem('interested', JSON.stringify(interested));
    localStorage.setItem('going', JSON.stringify(going));
  };

  const toggleGoing = (event) => {
    const interested = appState.getInterested();
    const going = appState.getGoing();

    // Verificar si el evento ya está en la lista de "Going"
    const index = going.findIndex(g => g.id === event.id);

    if (index !== -1) {
      // Si el evento ya está en la lista de "Going", se elimina
      going.splice(index, 1);
    } else {
      // Si el evento no está en la lista de "Going"

      // Verificar si el evento ya está en la lista de interesados
      const interestedIndex = interested.findIndex(int => int.id === event.id);
      if (interestedIndex !== -1) {
        // Si el evento ya está en la lista de interesados, se elimina de esa lista
        interested.splice(interestedIndex, 1);
      }

      // Se agrega el evento a la lista de "Going"
      going.push(event);
    }

    // Actualizar el estado de interesados y asistencias
    appState.setInterested(interested);
    appState.setGoing(going);

    // Guardar las listas actualizadas en el local storage
    localStorage.setItem('interested', JSON.stringify(interested));
    localStorage.setItem('going', JSON.stringify(going));
  };

  // ...
  const tabs = document.querySelectorAll('.div-tab');
  tabs.forEach(tab => {
    const category = tab.id;
    tab.addEventListener('click', () => cargar(category));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');

  const showFavorites = () => {
    // Obtener la lista de eventos favoritos del estado de la aplicación
    const favorites = appState.getFavorites();

    if (favorites.length === 0) {
      grid.innerHTML = 'There are no events in your favorites';
    } else {
      renderEvents(favorites, createEventElement, removeEventFromList);
    }
  };

  const showInterested = () => {
    // Obtener la lista de eventos interesados del estado de la aplicación
    const interested = appState.getInterested();

    if (interested.length === 0) {
      grid.innerHTML = 'There are no events in your interested list';
    } else {
      renderEvents(interested, createEventElement, removeEventFromList);
    }
  };

  const showGoing = () => {
    // Obtener la lista de eventos a los que se va a asistir del estado de la aplicación
    const going = appState.getGoing();

    if (going.length === 0) {
      grid.innerHTML = 'There are no events in your going list';
    } else {
      renderEvents(going, createEventElement, removeEventFromList);
    }
  };

  // Controladores de eventos para los tabs
  const favoritesTab = document.getElementById('favorites-tab');
  const interestedTab = document.getElementById('interested-tab');
  const goingTab = document.getElementById('going-tab');

  favoritesTab.addEventListener('click', () => {
    showFavorites();
    setActiveTab(favoritesTab);
  });

  interestedTab.addEventListener('click', () => {
    showInterested();
    setActiveTab(interestedTab);
  });

  goingTab.addEventListener('click', () => {
    showGoing();
    setActiveTab(goingTab);
  });

  // Función para establecer el tab activo
  const setActiveTab = (tab) => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  };

  // Mostrar la cuadrícula de favoritos por defecto al cargar la página
  showFavorites();
  setActiveTab(favoritesTab);
});


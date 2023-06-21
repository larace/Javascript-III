import { date, price, location } from './src/formato.js';
import { cache } from './src/cache.js';

class AppState {
  constructor() {
    if (AppState.instance) {
      return AppState.instance;
    }

    this.state = {
      favorites: [],
      interested: [],
      going: [],
    };

    AppState.instance = this;
  }

  static getInstance() {
    return new AppState();
  }

  getFavorites() {
    // Retorna una copia del array de favoritos para proteger los datos originales
    return [...this.state.favorites];
  }

  setFavorites(favorites) {
    // Actualiza el estado de favoritos con una copia del nuevo array
    this.state.favorites = [...favorites];
  }

  getInterested() {
    // Retorna una copia del array de interesados para proteger los datos originales
    return [...this.state.interested];
  }

  setInterested(interested) {
    // Actualiza el estado de interesados con una copia del nuevo array
    this.state.interested = [...interested];
  }

  getGoing() {
    // Retorna una copia del array de asistencias para proteger los datos originales
    return [...this.state.going];
  }

  setGoing(going) {
    // Actualiza el estado de asistencias con una copia del nuevo array
    this.state.going = [...going];
  }
}

const appState = AppState.getInstance();

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
      const elemento = createElement(evento);
      grid.appendChild(elemento);
    });
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
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Verificar si el evento ya está en la lista de favoritos
    const index = favorites.findIndex(fav => fav.id === event.id);
    
    if (index !== -1) {
      // Si el evento ya está en la lista, se elimina
      favorites.splice(index, 1);
    } else {
      // Si el evento no está en la lista, se agrega
      favorites.push(event);
    }
    
    // Guardar la lista de favoritos actualizada en el local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  const toggleInterested = (event) => {
    const interested = JSON.parse(localStorage.getItem('interested')) || [];
    const going = JSON.parse(localStorage.getItem('going')) || [];
    
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
    
    // Guardar las listas actualizadas en el local storage
    localStorage.setItem('interested', JSON.stringify(interested));
    localStorage.setItem('going', JSON.stringify(going));
  };
  
  const toggleGoing = (event) => {
    const interested = JSON.parse(localStorage.getItem('interested')) || [];
    const going = JSON.parse(localStorage.getItem('going')) || [];
    
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
    // Obtener la lista de eventos favoritos del localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
      grid.innerHTML = 'There are no events in your favorites';
    } else {
      render(favorites);
    }
  };

  const showInterested = () => {
    // Obtener la lista de eventos interesados del localStorage
    const interested = JSON.parse(localStorage.getItem('interested')) || [];

    if (interested.length === 0) {
      grid.innerHTML = 'There are no events in your interested list';
    } else {
      render(interested);
    }
  };

  const showGoing = () => {
    // Obtener la lista de eventos a los que se va a asistir del localStorage
    const going = JSON.parse(localStorage.getItem('going')) || [];

    if (going.length === 0) {
      grid.innerHTML = 'There are no events in your going list';
    } else {
      render(going);
    }
  };

  const renderEvents = (events) => {
    grid.innerHTML = '';
    events.forEach(evento => {
      const elemento = createElement(evento);
      grid.appendChild(elemento);
    });
  };

  const createEventElement = (event) => {
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
    removeButton.addEventListener('click', () => removeEventFromList(event));

    return elemento;
  };

  const removeEventFromList = (event) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const interested = JSON.parse(localStorage.getItem('interested')) || [];
    const going = JSON.parse(localStorage.getItem('going')) || [];

    // Remueve el evento de la lista correspondiente
    if (favorites.includes(event)) {
      const updatedFavorites = favorites.filter(e => e !== event);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else if (interested.includes(event)) {
      const updatedInterested = interested.filter(e => e !== event);
      localStorage.setItem('interested', JSON.stringify(updatedInterested));
    } else if (going.includes(event)) {
      const updatedGoing = going.filter(e => e !== event);
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


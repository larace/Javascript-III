import { renderEvents, createEventElement, removeEventFromList } from './src/render.js';
import { renderCalendar } from './src/calendar.js';

const hideCalendar = () => {
    calendarContainer.innerHTML = '';
  };

document.addEventListener('DOMContentLoaded', () => {
  const calendarContainer = document.getElementById('calendar-container');
  const calendar = renderCalendar(calendarContainer);

  calendar.render();
});

document.addEventListener('DOMContentLoaded', () => {
  const favoritesTab = document.getElementById('favorites-tab');
  const interestedTab = document.getElementById('interested-tab');
  const goingTab = document.getElementById('going-tab');
  const grid = document.getElementById('grid');

  const showFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    if (favorites && favorites.length > 0) {
      renderEvents(favorites, createEventElement, removeEventFromList);
    } else {
      grid.innerHTML = 'There are no events in your favorites';
    }
  };

  const showInterested = () => {
    const interested = JSON.parse(localStorage.getItem('interested'));

    if (interested && interested.length > 0) {
      renderEvents(interested, createEventElement, removeEventFromList);
    } else {
      grid.innerHTML = 'There are no events in your interested list';
    }
  };

  const showGoing = () => {
    const going = JSON.parse(localStorage.getItem('going'));

    if (going && going.length > 0) {
      renderEvents(going, createEventElement, removeEventFromList);
    } else {
      grid.innerHTML = 'There are no events in your going list';
    }
  };
  const showCalendar = () => {
    // Aquí puedes agregar la lógica para mostrar la vista del calendario
    grid.innerHTML = 'This is the calendar view';
  };
  
  const calendarTab = document.getElementById('calendar-tab');
  favoritesTab.addEventListener('click', () => {
    showFavorites();
    setActiveTab(favoritesTab);
    hideCalendar(); // Ocultar el calendario al cambiar al tab de Favorites
  });
  
  interestedTab.addEventListener('click', () => {
    showInterested();
    setActiveTab(interestedTab);
    hideCalendar(); // Ocultar el calendario al cambiar al tab de Interested
  });
  
  goingTab.addEventListener('click', () => {
    showGoing();
    setActiveTab(goingTab);
    hideCalendar(); // Ocultar el calendario al cambiar al tab de Going
  });
  
  calendarTab.addEventListener('click', () => {
    renderCalendar(calendarContainer, events);
    setActiveTab(calendarTab);
  });

  const setActiveTab = (tab) => {
    const tabs = document.querySelectorAll('.div-tab');
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  };
});
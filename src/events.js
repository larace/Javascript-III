import state from './state.js';

const state = state.getInstance();

function getFavorites() {
  return state.getFavorites();
}

function setFavorites(favorites) {
  state.setFavorites(favorites);
}

function getInterested() {
  return state.getInterested();
}

function setInterested(interested) {
  state.setInterested(interested);
}

function getGoing() {
  return state.getGoing();
}

function setGoing(going) {
  state.setGoing(going);
}

export { getFavorites, setFavorites, getInterested, setInterested, getGoing, setGoing };
export class AppState {
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
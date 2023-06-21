class AppState {
  constructor() {
    this.favorites = [];
    this.interested = [];
    this.going = [];
    this.activeTab = 'favorites';
  }

  static getInstance() {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }

  getFavorites() {
    return this.favorites;
  }

  setFavorites(favorites) {
    this.favorites = favorites;
  }

  getInterested() {
    return this.interested;
  }

  setInterested(interested) {
    this.interested = interested;
  }

  getGoing() {
    return this.going;
  }

  setGoing(going) {
    this.going = going;
  }

  getActiveTab() {
    return this.activeTab;
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  getListByTab(tab) {
    switch (tab) {
      case 'favorites':
        return this.favorites;
      case 'interested':
        return this.interested;
      case 'going':
        return this.going;
      default:
        return [];
    }
  }

  setListByTab(tab, list) {
    switch (tab) {
      case 'favorites':
        this.favorites = list;
        break;
      case 'interested':
        this.interested = list;
        break;
      case 'going':
        this.going = list;
        break;
    }
  }
}

export { AppState };
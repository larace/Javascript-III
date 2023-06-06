class Manager {
  constructor(eventName) {
    this.event = eventName;
  }

  subscribe(subscriber) {
    document.addEventListener(this.event, subscriber);
  }

  event(data) {
    document.dispatchEvent(new CustomEvent(this.event, { detail: data }));
  }
}

export default Manager;
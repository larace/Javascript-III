function Cache() {
  const cache = {};

  return new Proxy(cache, {
    get(target, category) {
      return target[category];
    },
    set(target, category, events) {
      target[category] = events;
      return true;
    },
  });
}

export const cache = new Cache();
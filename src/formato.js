export function date(date) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }
  
  export function location(location) {
    return `${location.address} • ${location.city}, ${location.state}`;
  }
  
  export function price(price) {
    if (price === 0) {
      return 'Free';
    } else {
      return '$' + price.toFixed(2);
    }
  }
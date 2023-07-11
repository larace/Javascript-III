export function createEventModal() {
    const modal = document.getElementById('event-modal');
    const modalContent = document.querySelector('.modal-content');
    const eventDetails = document.getElementById('event-details');
  
    function showModal(event) {
      eventDetails.innerHTML = '';
  
      const image = document.createElement('img');
      image.src = event.image;
      image.alt = event.title;
  
      const title = document.createElement('h3');
      title.textContent = event.title;
  
      const date = document.createElement('p');
      date.textContent = 'Date: ' + date(new Date(event.date));
  
      const location = document.createElement('p');
      location.textContent = 'Location: ' + location(event.location);
  
      const price = document.createElement('p');
      price.textContent = 'Price: ' + price(event.price);
  
      eventDetails.appendChild(image);
      eventDetails.appendChild(title);
      eventDetails.appendChild(date);
      eventDetails.appendChild(location);
      eventDetails.appendChild(price);
  
      modal.style.display = 'block';
    }
  
    function closeModal() {
      modal.style.display = 'none';
    }
  
    function initializeModal() {
      const closeButton = document.querySelector('.close');
      closeButton.addEventListener('click', closeModal);
  
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    }
  
    return {
      showModal,
      closeModal,
      initializeModal,
    };
  }
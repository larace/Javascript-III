export function initializeTabs(tabs, renderEvents) {
  tabs.forEach(tab => {
    const category = tab.id;
    tab.addEventListener('click', () => cargar(category, renderEvents));
  });
}

export function setActiveTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
}
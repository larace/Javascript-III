export function renderCalendar(calendarContainer, events) {
  const calendarBody = document.createElement('div');
  calendarBody.classList.add('calendar-body');
  calendarContainer.appendChild(calendarBody);

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  const render = () => {
    calendarBody.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    renderHeader();
    renderEmptyCells(firstDay);
    renderCalendarCells(lastDay);
  };

  const renderHeader = () => {
    const calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar-header');
  
    const prevMonthBtn = createButton('<', 'prev-month-btn', () => navigateMonth('prev'));
    calendarHeader.appendChild(prevMonthBtn);
  
    const calendarTitle = document.createElement('h2');
    calendarTitle.classList.add('calendar-title');
    calendarTitle.textContent = getCalendarTitle(currentYear, currentMonth);
    calendarHeader.appendChild(calendarTitle);
  
    const nextMonthBtn = createButton('>', 'next-month-btn', () => navigateMonth('next'));
    calendarHeader.appendChild(nextMonthBtn);
  
    calendarContainer.insertBefore(calendarHeader, calendarBody);
  };
  
  const getCalendarTitle = (year, month) => {
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(year, month);
    return date.toLocaleDateString('en-US', options);
  };

  const createButton = (text, className, clickHandler) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', clickHandler);
    return button;
  };

  const renderEmptyCells = (numEmptyCells) => {
    for (let i = 0; i < numEmptyCells; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('calendar-cell', 'empty-cell');
      calendarBody.appendChild(emptyCell);
    }
  };

  const renderCalendarCells = (lastDay) => {
    for (let day = 1; day <= lastDay; day++) {
      const calendarCell = document.createElement('div');
      calendarCell.classList.add('calendar-cell');
      calendarCell.textContent = day;
      calendarBody.appendChild(calendarCell);
    }
  };
  

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
    } else if (direction === 'next') {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }

    render();
  };

  render(); // Render the calendar on load

  return {
    render,
    navigateMonth,
  };
}

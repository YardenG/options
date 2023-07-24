function buildCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const monthHeader = document.getElementById('month');
    const yearHeader = document.getElementById('year');

    // Clear out any previous dates
    calendarBody.innerHTML = '';

    // Set the month and year headers
    monthHeader.innerText = month;
    yearHeader.innerText = year;

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill in the blanks before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        calendarBody.appendChild(day);
    }

    // Fill in the dates for the month
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.innerText = i;
        calendarBody.appendChild(day);
    }
}

// Use the current month and year as an example
const now = new Date();
buildCalendar(now.getMonth(), now.getFullYear());

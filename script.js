document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const eventForm = document.getElementById('add-event-form');
    const eventTitleInput = document.getElementById('event-title');
    const eventDateInput = document.getElementById('event-date');
    
    // Generate calendar for the current month
    function generateCalendar() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        calendarElement.innerHTML = '';

        // Create empty days at the beginning
        for (let i = 0; i < firstDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            calendarElement.appendChild(dayDiv);
        }

        // Create days with events
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            calendarElement.appendChild(dayDiv);
        }
    }

    // Load events from local storage
    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => {
            const dayDivs = document.querySelectorAll('.day');
            dayDivs.forEach(dayDiv => {
                if (parseInt(dayDiv.textContent) === event.date) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.textContent = event.title;
                    dayDiv.appendChild(eventDiv);
                }
            });
        });
    }

    // Handle form submission
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = eventTitleInput.value;
        const date = new Date(eventDateInput.value).getDate();

        if (!title || !date) return;

        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push({ title, date });
        localStorage.setItem('events', JSON.stringify(events));
        
        generateCalendar();
        loadEvents();
        
        eventTitleInput.value = '';
        eventDateInput.value = '';
    });

    generateCalendar();
    loadEvents();
});

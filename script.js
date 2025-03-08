let selectedTimezone = 'local';

function updateClock() {
    const now = new Date();
    updateTime(now);
    updateDate(now);
}

function updateTime(now) {
    let timeToDisplay = now;
    
    if (selectedTimezone !== 'local') {
        timeToDisplay = new Date(now.toLocaleString('en-US', {
            timeZone: selectedTimezone
        }));
    }

    let hours = timeToDisplay.getHours();
    let minutes = timeToDisplay.getMinutes();
    let seconds = timeToDisplay.getSeconds();
    let period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    // Add leading zeros
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    // Format the time with AM/PM
    const timeString = `${hours}:${minutes}:${seconds} ${period}`;
    
    // Update with fade effect
    const clockElement = document.getElementById('clock');
    if (clockElement.textContent !== timeString) {
        clockElement.style.opacity = 0;
        setTimeout(() => {
            clockElement.textContent = timeString;
            clockElement.style.opacity = 1;
        }, 200);
    }
}

function updateDate(now) {
    let dateToDisplay = now;
    
    if (selectedTimezone !== 'local') {
        dateToDisplay = new Date(now.toLocaleString('en-US', {
            timeZone: selectedTimezone
        }));
    }

    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: selectedTimezone === 'local' ? undefined : selectedTimezone
    };
    
    const dateString = dateToDisplay.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = dateString;
}

// Event listener for timezone selection
document.getElementById('timezone-select').addEventListener('change', function(e) {
    selectedTimezone = e.target.value;
    updateClock(); // Update immediately when timezone changes
});

// Initial update
updateClock();

// Update every second
setInterval(updateClock, 1000);

// Add smooth transition for clock digits
document.documentElement.style.setProperty('--transition-speed', '0.2s'); 
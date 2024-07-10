document.addEventListener('DOMContentLoaded', () => {
    const countdown = document.getElementById('countdown');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const startTimerButton = document.getElementById('start-timer');
    const datetimeInput = document.getElementById('datetime');
    let countdownInterval;

    function updateCountdown(targetDate) {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minutesSpan.textContent = minutes;
        secondsSpan.textContent = seconds;

        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            countdown.innerHTML = "<div>Countdown finished!</div>";
        }
    }

    startTimerButton.addEventListener('click', () => {
        const targetDate = new Date(datetimeInput.value).getTime();

        if (isNaN(targetDate)) {
            alert('Please set a valid date and time.');
            return;
        }

        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            updateCountdown(targetDate);
        }, 1000);
    });
});

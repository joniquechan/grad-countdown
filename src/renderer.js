const { remote } = require('electron');

document.addEventListener("DOMContentLoaded", function () {
    // get document elements
    const day1Element = document.getElementById('day1');
    const day2Element = document.getElementById('day2');
    const hour1Element = document.getElementById('hour1');
    const hour2Element = document.getElementById('hour2');
    const minute1Element = document.getElementById('minute1');
    const minute2Element = document.getElementById('minute2');
    const motivationBtn = document.getElementById('motivationBtn');
    const motivationImage = document.getElementById('motivationImage');
    const motivationPopup = document.getElementById('motivationPopup');
    const backBtn = document.getElementById('backBtn');
    const moreBtn = document.getElementById('moreBtn');
    const gradImage = document.getElementById('gradImage');
    const gradPopup = document.getElementById('gradPopup');

    // set grad date
    const graduationDate = "2025-05-02T10:00:00";
    const gradGif = 'img/grad.gif'

    // picture array
    const motivationalPictures = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg',
        'img/9.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg', 'img/13.jpg', 'img/14.gif', 'img/15.gif'];

    // format numbers
    function formatNumber(num) {
        return num < 10 ? `0${num}` : num.toString();
    }

    // countdown function
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date(graduationDate);
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            const daysFormatted = formatNumber(days);
            const hoursFormatted = formatNumber(hours);
            const minutesFormatted = formatNumber(minutes);

            day1Element.textContent = daysFormatted[0];
            day2Element.textContent = daysFormatted[1];
            hour1Element.textContent = hoursFormatted[0];
            hour2Element.textContent = hoursFormatted[1];
            minute1Element.textContent = minutesFormatted[0];
            minute2Element.textContent = minutesFormatted[1];
        } else {
            day1Element.textContent = '0';
            day2Element.textContent = '0';
            hour1Element.textContent = '0';
            hour2Element.textContent = '0';
            minute1Element.textContent = '0';
            minute2Element.textContent = '0';
            showGraduation();
        }
    }

    function showGraduation() {
        gradPopup.classList.add('show');
        const audio = document.getElementById("backgroundMusic");
        audio.currentTime = 34;
        audio.play();
    }

    function showRandomMotivation() {
        const randomIndex = Math.floor(Math.random() * motivationalPictures.length);
        motivationImage.src = motivationalPictures[randomIndex];
    }

    function showMotivationPopup() {
        showRandomMotivation();
        motivationPopup.classList.add('show');
    }

    function hideMotivationPopup() {
        motivationPopup.classList.remove('show');
    }
    
    // event listeners
    motivationBtn.addEventListener('click', showMotivationPopup);
    moreBtn.addEventListener('click', showRandomMotivation);
    backBtn.addEventListener('click', hideMotivationPopup);

    // run countdown every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
});

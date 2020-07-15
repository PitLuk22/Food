function timer(id, deadline) {

    // let final = new Date(2020, 5, 10);  тоже самое!

    function getTimeRemaining(endtime) {
        let diff = Date.parse(endtime) - new Date(); // отнимаем от кол-ва миллисекунд до заданного времени сегодняшнюю дату!
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor(diff / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(diff / (1000 * 60) % 60);
        let seconds = Math.floor(diff / (1000) % 60);

        return {
            'total': diff,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num <= 9) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        let timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let timerObj = getTimeRemaining(endtime);

            days.innerHTML = getZero(timerObj.days);
            hours.innerHTML = getZero(timerObj.hours);
            minutes.innerHTML = getZero(timerObj.minutes);
            seconds.innerHTML = getZero(timerObj.seconds);

            if (timerObj.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
            }
        }

    }
    setClock(id, deadline);
}

export default timer;
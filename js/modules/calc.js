function calc() {

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, activity;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = '1.375';
        localStorage.setItem('activity', activity);
    }

    function calcActivity() {
        if (!sex || !height || !weight || !age || !activity) {
            result.textContent = '________';
            return;
        }
        if (sex === 'male') {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * activity);
        } else {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * activity);
        }
    }

    calcActivity();


    // запускаем при загрузке страницы 
    function initLocalStorage(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.dataset.activity === localStorage.getItem('activity')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalStorage('#gender div', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');


    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`); // получаем все дивы внутри блока sex и блока activity
        elements.forEach(elem => {
            elem.addEventListener('click', function (event) {



                if (event.target.getAttribute('data-activity')) {
                    activity = +event.target.getAttribute('data-activity');
                    localStorage.setItem('activity', +event.target.getAttribute('data-activity'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                event.target.classList.add(activeClass);

                calcActivity();
            });
        });
    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.style.opacity = '0';
        alert.textContent = 'Введите целое число!';
        input.after(alert);
        input.addEventListener('input', function () {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
                alert.style.opacity = '1';
                alert.style.transform = 'translateY(120%)';
            } else {
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-50%)';
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcActivity();
        });
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

    // Очищение инпутов при пререзагрузке
    const ipnuts = document.querySelectorAll('.calculating__choose-wrap input');
    ipnuts.forEach(elem => {
        elem.value = '';
    });

}

export default calc;
import {
    getResource
} from '../services/services';

function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, menu, descr, price, currency, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.menu = menu;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 70;
            this.currency = currency;
            this.classes = classes;
            this.changeCurrencyfromDollarTORub();
        }
        changeCurrencyfromDollarTORub() {
            this.price = this.price * this.transfer;
        }
        render() {
            let div = document.createElement('div');
            if (this.classes.length === 0) {
                this.div = 'menu__item';
                div.classList.add(this.div);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            div.innerHTML =
                `<img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.menu}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
                </div>`;

            this.parent.append(div);
        }
    }

    // const m = new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     "9",
    //     "руб",
    //     ".menu .container"
    // );
    // m.render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     "12",
    //     "руб",
    //     ".menu .container"
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
    //     молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу 
    //     и импортных вегетарианских стейков.`,
    //     "10",
    //     "руб",
    //     ".menu .container"
    // ).render();


    // Создание карточек с использованием классов и базы данных


    getResource('http://localhost:3000/menu')
        // здесь мы получаем массив с объектами наших карточек внутри
        .then(data => {
            console.log(data);
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price,
                currency
            }) => {
                new MenuCard(img, altimg, title, descr, price, currency, '.menu .container').render();
            });
        });


    // С использованием библиотеки AXIOS

    // axios.get("http://localhost:3000/menu")
    //     .then(data => data.data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price,
    //         currency
    //     }) => new MenuCard(img, altimg, title, descr, price, currency, '.menu .container').render()));


    // Динамическое создание карточек с использованием базы данных

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price,
    //         currency
    //     }) => {
    //         price = price * 70;
    //         let div = document.createElement('div');
    //         div.classList.add('menu__item');
    //         div.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> ${currency}/день</div>
    //         </div>`;
    //         document.querySelector(".menu .container").append(div);
    //     });
    // }
}

export default cards;
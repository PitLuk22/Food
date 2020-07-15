import {
    openModal,
    closeModal
} from './modal';

import {
    postData
} from '../services/services';

function forms(form, openModalTimerId) {
    // Работа с формаим с помощью FETCH

    const forms = document.querySelectorAll(form);

    const messageStatus = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Cкоро мы вам перевоним.',
        fail: 'Что-то пошло не так...'
    };

    forms.forEach(elem => {
        bindPostData(elem);
    });



    function bindPostData(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const message = document.createElement('img');
            message.src = messageStatus.loading;
            message.style.cssText = `
                display: block;
                margin: 0px auto;
                width: 70px;
                height: 45px;
            `;
            form.insertAdjacentElement('afterend', message);

            const formData = new FormData(form);

            // для формата JSON
            // 1) делаем массив массивов (значение - ключ)
            // 2) делаем классический объект 
            // 3) делаем JSON объект
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messageStatus.success);
                    message.remove();
                }).catch(() => {
                    showThanksModal(messageStatus.fail);
                    message.remove();
                }).finally(() => {
                    form.reset();
                });
        });
    }


    //Работа с формами с помощью XMLHttpRequest

    // const forms = document.querySelectorAll('form');

    // const messageStatus = {
    //     loading: 'img/form/spinner.svg',
    //     success: 'Спасибо! Cкоро мы вам перевоним.',
    //     fail: 'Что-то пошло не так...'
    // };

    // forms.forEach(elem => {
    //     formData(elem);
    // });

    // function formData(form) {
    //     form.addEventListener('submit', function (event) {
    //         event.preventDefault();

    //         const message = document.createElement('img');
    //         message.src = messageStatus.loading;
    //         message.style.cssText = `
    //             display: block;
    //             margin: 0px auto;
    //             width: 70px;
    //             height: 45px;
    //         `;
    //         form.insertAdjacentElement('afterend', message);

    //         const request = new XMLHttpRequest();

    //         request.open('POST', 'server.php');
    //         request.setRequestHeader('Content-type', 'application/json');
    //         const formData = new FormData(form);

    //         const object = {};
    //         formData.forEach((key, value) => {
    //             object[key] = value;
    //         });
    //         const json = JSON.stringify(object);
    //         request.send(json);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.responseText);
    //                 showThanksModal(messageStatus.success);
    //                 form.reset();
    //                 message.remove();
    //             } else {
    //                 showThanksModal(messageStatus.fail);
    //             }
    //         });

    //     });
    // }

    // Модальное окно благодарности

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');

        openModal('.modal', openModalTimerId);

        const thanks = document.createElement('div');
        thanks.classList.add('modal__dialog');
        thanks.innerHTML = `
            <div class="modal__content">
                <div class="modal__title">${message}</div>
                <div class="modal__close" data-close>&times;</div>
            </div>
        `;
        document.querySelector('.modal').append(thanks);

        setTimeout(function () {
            thanks.remove();
            modalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 2000);


    }
}

export default forms;
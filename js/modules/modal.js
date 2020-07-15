function openModal(modalSelector, openModalTimerId) {
    const overlay = document.querySelector(modalSelector);

    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // отмена скролла
    clearTimeout(openModalTimerId);
}

function closeModal(modalSelector, openModalByScroll) {
    const overlay = document.querySelector(modalSelector);

    overlay.classList.remove('show');
    document.body.style.overflow = '';
    window.removeEventListener('scroll', openModalByScroll);

}



function modal(btnSelector, modalSelector, openModalTimerId) {

    const btn = document.querySelectorAll(btnSelector),
        overlay = document.querySelector(modalSelector);

    btn.forEach(elem => {
        elem.addEventListener('click', function () {
            openModal(modalSelector, openModalTimerId);
        });
    });


    overlay.addEventListener('click', (event) => {
        if (event.target === overlay || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector, openModalByScroll);
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 27 && overlay.classList.contains('show')) {
            closeModal(modalSelector, openModalByScroll);
        }
    });

    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {

            openModal(modalSelector, openModalTimerId);
            window.removeEventListener('scroll', openModalByScroll);

        }
    }

    window.addEventListener('scroll', openModalByScroll);

}


export default modal;
export {
    openModal,
    closeModal
};
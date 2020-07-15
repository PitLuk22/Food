function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector);
    const content = document.querySelectorAll(tabsContentSelector);
    const tabsBlock = document.querySelector(tabsParentSelector);

    // tabs.forEach((tab, i) => {
    //     tab.addEventListener('click', function () {
    //         for (let item of tabs) {
    //             item.classList.remove('tabheader__item_active');
    //         }
    //         this.classList.add('tabheader__item_active');
    //         content.forEach((elem, k) => {
    //             elem.classList.add('hide');
    //             if (i == k) {
    //                 elem.classList.remove('hide');
    //             }
    //         });
    //     });

    // });

    function hideTabsContent() {
        content.forEach(elem => {
            elem.classList.add('hide');
        });
        tabs.forEach(elem => {
            elem.classList.remove(activeClass);
        });
    }

    function showTabsContent(i = 0) {
        content[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideTabsContent();
    showTabsContent();

    tabsBlock.addEventListener('click', function (event) {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((elem, i) => {
                if (target == elem) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });

        }

    });
}
export default tabs;
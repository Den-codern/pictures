const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                btnClicked = true;
                if (destroy) {
                    item.remove();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });



        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';

            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });



        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
            }

        });
    }
    let btnClicked = false;

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal').forEach((item) => {
                item.classList.add('animated', 'fadeIn');
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';

                }
            });
            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;

            }
        }, time);

    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openModalByscroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnClicked && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    //use modals

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openModalByscroll('.fixed-gift');
    showModalByTime('.popup-consultation', 5000);

};

export default modals;
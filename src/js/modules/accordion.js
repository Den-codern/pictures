const accordion = (triggerSelector, contentSelector) => {
    const trigger = document.querySelectorAll(triggerSelector);
    const content = document.querySelectorAll(contentSelector);

    content.forEach((acc) => {
        acc.style.display = 'none';
    });

    trigger.forEach((btn) => {
        btn.addEventListener('click', () => {
            let contentOpen = btn.nextElementSibling;
            if (contentOpen.getAttribute('data-click') === 'false') {
                contentOpen.setAttribute('data-click', 'true');
                contentOpen.style.display = 'block';
                contentOpen.classList.add('animated', 'fadeInDown');
            } else if (contentOpen.getAttribute('data-click') === 'true') {
                contentOpen.setAttribute('data-click', 'false');
                contentOpen.style.display = 'none';
                contentOpen.classList.remove('animated', 'fadeInDown');
            }
        });
    });
};
export default accordion;
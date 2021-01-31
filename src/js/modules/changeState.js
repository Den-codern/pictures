const changeState = (state) => {
    const size = document.querySelector('#size');
    const material = document.querySelector('#material');
    const options = document.querySelector('#options');

    function bindActionToElems(event, elem, prop) {
        elem.addEventListener(event, () => {
            if (elem.nodeName === 'SELECT') {
                state[prop] = elem.value;
            }
            console.log(state);
        });

    }


    bindActionToElems('change', size, 'size');
    bindActionToElems('change', material, 'material');
    bindActionToElems('change', options, 'options');
};

export default changeState;
/**
 * Toggle blur background
 */
function toggleBlurBg () {
    document.querySelector('.blur').toggleAttribute('hidden');    
}

/**
 * Bind toggle event for all clickable buttons
 */
function bindEventBlur() {
    const ul = document.querySelector('ul');

    const addNew = document.querySelector('#add-new');

    const allForm = document.querySelectorAll('form');
    ul.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.icon'))
            toggleBlurBg();
    });

    addNew.addEventListener('click', toggleBlurBg);
    allForm[0].addEventListener('submit', toggleBlurBg);
    allForm[1].addEventListener('submit', toggleBlurBg);
}

/**
 * Module init
 */
function init () {
    bindEventBlur();
}

export {init};
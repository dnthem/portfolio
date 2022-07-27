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
    allForm.forEach(form => {
        form.addEventListener('reset', toggleBlurBg);
    })
    
}

/**
 * Module init
 */
function init () {
    bindEventBlur();
}

export {init};
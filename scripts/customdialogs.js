let lazyCoding = false;

function showDialogWith (title, message, option = 0) {
    const dialog = document.querySelector('#custom-dialog');
    const header = document.querySelector('#dialog-header');
    const content= document.querySelector('#dialog-content');
    const input  = document.querySelector('#user-input');
    const canBtn = document.querySelector('#cancel');

    header.innerHTML = title;
    content.innerHTML = message;
    if (option === 0)
        lazyCoding = true;
    else
        canBtn.removeAttribute('hidden');
        
    if (option > 1) 
        input.removeAttribute('hidden');
        
    dialog.setAttribute('open', 'true');
}

function closeDialog () {
    document.querySelector('#custom-dialog').removeAttribute('open');
}

function showResult (result) {
    if (lazyCoding) {
        lazyCoding = false;
        return;
    }

    const output = document.querySelector('#output');
    let message = undefined;
    if (typeof(result) === 'boolean')
        message = result;
    else if (result) 
        message = DOMPurify.sanitize(result);
    else
        message = `User didn't enter anything`;

    output.innerHTML = `The value returned: ${message}`;
    
}

document.addEventListener('click', (event) => {
    if (event.target.matches('.dialog-btns')) {
        const input  = document.querySelector('#user-input');
        let result;
        if (event.target.matches('#ok'))
            result = true;
        else
            result = false;
        
        if (!input.getAttribute('hidden')) // not hidden
            result = input.value;

        showResult(result);
        input.value = '';
        input.setAttribute('hidden', 'true'); // hide input 
        document.querySelector('#cancel').setAttribute('hidden', 'true'); // hide cancel btn
        closeDialog();
    } 
})

const alertBtn       = document.querySelector('#alert');
const confirmBtn     = document.querySelector('#confirm');
const promptBtn      = document.querySelector('#prompt');
const output         = document.querySelector('#output');

function printResult(result) {
    output.innerHTML = result;
}

alertBtn.addEventListener('click', () => {
    showDialogWith('alert', 'Alert pressed');
});

confirmBtn.addEventListener('click', () => {
    showDialogWith('confirm', 'You just hit confirm button', 1);
});

promptBtn.addEventListener('click', () => {
    showDialogWith('prompt', 'Please enter something', 2);
});

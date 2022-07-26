// Alert button flag
window.alertConfirm = false;

/**
 * shows dialog
 * @param {string} title is the title of the dialog
 * @param {string} message message in the dialog
 * @param {Number} option 0 - alert, 1 - confirm, 2 - prompt
 */
function showDialogWith (title, message, option = 0) {
    const dialog = document.querySelector('#custom-dialog');
    const header = document.querySelector('#dialog-header');
    const content= document.querySelector('#dialog-content');
    const input  = document.querySelector('#user-input');
    const canBtn = document.querySelector('#cancel');

    header.innerHTML = title;
    content.innerHTML = message;
    if (option === 0)
        window.alertConfirm = true;
    else
        canBtn.removeAttribute('hidden');
        
    if (option > 1) 
        input.removeAttribute('hidden');
        
    dialog.setAttribute('open', 'true');
}

/**
 * Closes dialog
 */
function closeDialog () {
    document.querySelector('#custom-dialog').removeAttribute('open');
}

/**
 * Displays message input tag
 * @param {string} result message from the dialog if any
 * @returns none
 */
function showResult (result) {
    if (window.alertConfirm) {
        window.alertConfirm = false;
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

/**
 * Disables all btns except btns from dialog
 */
function disableBtns () {
    const btns = document.querySelectorAll('.btns');
    btns.forEach(btn => btn.disabled = true);
}

/**
 * Enables all btns
 */
function enableBtns () {
    const btns = document.querySelectorAll('.btns');
    btns.forEach(btn => btn.disabled = false);
}

document.querySelector('dialog').addEventListener('click', (event) => {
        const input  = document.querySelector('#user-input');
        let result;
        if (event.target.matches('#ok'))
            result = true;
        else
            result = false;
        
        if (!input.getAttribute('hidden')) 
            result = input.value;

        showResult(result);
        input.value = '';
        input.hidden = true; // hide input 
        document.querySelector('#cancel').hidden = true; // hide cancel btn
        closeDialog();
        enableBtns ();
})


//---------- binding all the buttons -----------

const alertBtn       = document.querySelector('#alert');
const confirmBtn     = document.querySelector('#confirm');
const promptBtn      = document.querySelector('#prompt');
const output         = document.querySelector('#output');

function printResult(result) {
    output.innerHTML = result;
}

alertBtn.addEventListener('click', () => {
    disableBtns ();
    showDialogWith('alert', 'Alert pressed');
});

confirmBtn.addEventListener('click', () => {
    disableBtns ();
    showDialogWith('confirm', 'You just hit confirm button', 1);
});

promptBtn.addEventListener('click', () => {
    disableBtns ();
    showDialogWith('prompt', 'Please enter something', 2);
});

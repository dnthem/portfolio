import {createEntry, updateEntry, deleteEntry} from "./crud.js";

/**
 * Displays Add-new-item dialog. If arguments are passed in, it populates the form.
 * @param {Object} item is the entry object - default is null
 * @param {Number} index is the id of the object - default is 0
 * @returns nothing
 */
function showDialog (item = null, index = 0) {
    document.querySelector('#dialog').open = true;

    if (!item) return; 

    document.querySelector('#add-new-item-form').dataset.index = index;
    document.querySelector('#title').value = item.title;
    document.querySelector('#date').value = new Date(item.date).toISOString().substring(0,11);
    document.querySelector('#summary').value = item.summary;
}

function emptyInput() {
    delete document.querySelector('#add-new-item-form').dataset.index;
    document.querySelector('#title').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#summary').value = '';
}

/**
 * Adds event listener when submitting add new item dialog.
 * Either submit or cancel depends on the submit button value
 */
function bindSubmitDialog() {
    const form = document.querySelector('#add-new-item-form');
    const dialog = document.querySelector('#dialog');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        

        dialog.open = false; // close dialog
        
        if (event.submitter.value === 'Cancel')
        {
            emptyInput();
            return;
        }

        const newEntry = {};
        newEntry.title   = document.querySelector('#title').value;
        newEntry.date    = new Date(document.querySelector('#date').valueAsNumber).toDateString();
        newEntry.summary = document.querySelector('#summary').value;

        if (!form.dataset.index)
            createEntry(newEntry);
        else 
            updateEntry(newEntry, form.dataset.index);
 
        emptyInput();
    })
}

/**
 * Adds event listener for the remove Dialog.
 */
function bindRemoveDialog() {
    const form = document.querySelector('#remove-item');
    const dialog = document.querySelector('#remove-dialog');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        dialog.removeAttribute('open');

        if (event.submitter.value === 'Cancel')
            return;
        
        deleteEntry(event.target.dataset.index);
        delete event.target.dataset.index;
    })
}

/**
 * Displays remove Dialog
 * @param {Number} index is the id of the item needed to remove.
 */
function showRemoveDialog (index) {
    document.querySelector('#remove-dialog').setAttribute('open', 'true');
    document.querySelector('#remove-item').dataset.index = index;
}

/**
 * Dialog Module init
 */
function dialogInit () {
    bindSubmitDialog();
    bindRemoveDialog();
}

export {
    dialogInit,
    showDialog,
    showRemoveDialog,
}
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
    document.querySelector('#date').value = item.date;
    document.querySelector('#summary').value = item.summary;
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

        const newEntry = {};
        newEntry.title   = event.currentTarget[0].value;
        newEntry.date    = event.currentTarget[1].value;
        newEntry.summary = event.currentTarget[2].value;

        if (!form.dataset.index)
            createEntry(newEntry);
        else 
            updateEntry(newEntry, form.dataset.index);
 
        form.reset();
    });

    form.addEventListener('reset', () => dialog.open = false);
}


/**
 * Adds event listener for the remove Dialog.
 */
function bindRemoveDialog() {
    const form = document.querySelector('#remove-item');
    const dialog = document.querySelector('#remove-dialog');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        deleteEntry(event.target.dataset.index);
        delete event.target.dataset.index;
        form.reset();
    });
    form.addEventListener('reset', () => dialog.open = false);
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
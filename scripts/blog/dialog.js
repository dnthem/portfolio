import {createEntry, updateEntry, deleteEntry} from "./crud.js";

function showDialog (item = null, index = 0) {
    document.querySelector('#dialog').setAttribute('open', 'true');

    if (!item) return; 

    document.querySelector('#add-new-item-form').dataset.index = index;
    document.querySelector('#title').value = item.title;
    document.querySelector('#date').value = new Date(item.date).toISOString().substring(0,10);
    document.querySelector('#summary').value = item.summary;
}

function emptyInput() {
    delete document.querySelector('#add-new-item-form').dataset.index;
    document.querySelector('#title').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#summary').value = '';
}

function bindDialogSubmit() {
    const form = document.querySelector('#add-new-item-form');
    const dialog = document.querySelector('#dialog');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        dialog.removeAttribute('open'); // close dialog
        
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

function showRemoveDialog (index) {
    document.querySelector('#remove-dialog').setAttribute('open', 'true');
    document.querySelector('#remove-item').dataset.index = index;
}
    
function dialogInit () {
    bindDialogSubmit();
    bindRemoveDialog();
}

export {
    dialogInit,
    showDialog,
    showRemoveDialog,
}
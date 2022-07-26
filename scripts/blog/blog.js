import {db, setItem, readAllEntry, readItemWidthId } from "./crud.js";
import * as DialogController from "./dialog.js";
import * as StyledDialog from "./styledDialog.js";
import {data} from "./sample.js";

/**
 * Adds event listeners for edit and delete buttons for every entry
 */
function bindEditDeleteEvents() {
    const contentList = document.querySelector('#content-list');
    contentList.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target.matches('.edit')) {
            const item = readItemWidthId(target.dataset.index);
            DialogController.showDialog(item, item.id);
        }
            
        else if (target.matches('.delete'))
        {
            DialogController.showRemoveDialog(target.dataset.index);
        }
            
    })
}

/**
 * Adds event listener for add new item button
 */
function bindAddNewItem() {
    document.querySelector('#add-new').addEventListener('click', () => {
        DialogController.showDialog(null);
    })
}

/**
 * Populates the list with all entry from local storage
 */
function populateList() {
    const data = readAllEntry();
    const contentList = document.querySelector('#content-list');
    if (!data.length) {
        contentList.innerHTML = 'List is empty';
        return;
    }
    
    contentList.innerHTML = '';
    data.forEach((item) => {
        contentList.appendChild(setItem(item, item.id));
    })
}

/**
 * Blog init
 */
function init() {
    // If the data in local storage has not been set, then load sample data
    if (localStorage.getItem(db) === null)        
        localStorage.setItem(db, JSON.stringify(data));
    
    populateList();
    bindEditDeleteEvents();
    bindAddNewItem();
    DialogController.dialogInit();
    StyledDialog.init();
}

window.addEventListener('DOMContentLoaded', init);
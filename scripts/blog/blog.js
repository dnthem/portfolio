import {db, setItem, readAllEntry, readItemWidthId } from "./crud.js";
import * as DialogController from "./dialog.js";

/**
 * Sameple data
 */
const data = [
    {
        id: 1,
        title: "Something",
        date: new Date("07/22/2022").toDateString(),
        summary: "Today is beatiful",
    },
    {
        id: 2,
        title: "marvel movies",
        date: new Date("07/23/2022").toDateString(),
        summary: "Why it is so stupid",
    },
    {
        id: 3,
        title: "How to be successful",
        date: new Date("07/24/2022").toDateString(),
        summary: "Don't know, just do it",
    },
];

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
        contentList.append(setItem(item, item.id));
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
}

document.addEventListener('DOMContentLoaded', () => {
    init();
})
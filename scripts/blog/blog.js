import { setItem, readAllEntry, readItemWidthId } from "./crud.js";
import * as DialogController from "./dialog.js";


function bindEditDeleteEvents() {
    const contentList = document.querySelector('#content-list');
    contentList.addEventListener('click', (event) => {
        
        const target = event.target;
        
        if (target.matches('.edit')) {
            const item = readItemWidthId(target.dataset.index);
            DialogController.showDialog(item, target.dataset.index);
        }
            
            
        else if (target.matches('.delete'))
        {
            DialogController.showRemoveDialog(target.dataset.index);
        }
            
    })
}

function bindAddNewItem() {
    document.querySelector('#add-new').addEventListener('click', () => {
        DialogController.showDialog(null);
    })
}

function populateList() {
    const data = readAllEntry();
    const contentList = document.querySelector('#content-list');
    contentList.innerHTML = '';
    data.forEach((item, index) => {
        contentList.innerHTML += setItem(item, index);
    })
}

function init() {
    // sample data
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
    
    localStorage.setItem('DATA', JSON.stringify(data));
    populateList();
    bindEditDeleteEvents();
    bindAddNewItem();
    DialogController.dialogInit();
}


document.addEventListener('DOMContentLoaded', () => {
    init();
})

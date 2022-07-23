const db = 'DATA';


function setItem (item, index) {
    const result = `
        <li data-index="${index}">
            <h3> ${item.title}  </h3>
            <p>
                <em>${item.date}</em>
                <br>
                Summary: ${item.summary}
            </p>
            <div class="buttons">
                <button class="edit" data-index="${index}">edit</button>
                <button class="delete" data-index="${index}">delete</buton>
            </div>
        </li>
        `;
    return result;
}

function createEntry(item) {
    const data = JSON.parse(localStorage.getItem(db));
    const contentList = document.querySelector('#content-list');

    data.push(item);
    item.id = data.length-1;
    contentList.innerHTML += setItem(item, item.id);

    localStorage.setItem(db, JSON.stringify(data));
}

function readAllEntry() {
    return JSON.parse(localStorage.getItem(db));
}

function readItemWidthId (id) {
    const data =  readAllEntry();
    return data.find(item => item.id = id);
}


function updateEntry (item, index) {
    const data = JSON.parse(localStorage.getItem(db));
    const itemIdx = data.findIndex(item => item.id == index);
    data[itemIdx] = item;
    document.querySelector(`li[data-index="${index}"]`).innerHTML = `
            <h3> ${item.title}  </h3>
            <p>
                <em>${item.date}</em>
                <br>
                Summary: ${item.summary}
            </p>
            <div class="buttons">
                <button class="edit" data-index="${index}">edit</button>
                <button class="delete" data-index="${index}">delete</buton>
            </div>
    `;
    // update localStorage
    localStorage.setItem(db, JSON.stringify(data));
}

function deleteEntry (index) {
    const data = JSON.parse(localStorage.getItem(db));
    const itemIdx = data.findIndex(item => item.id == index);
    data.splice(itemIdx, 1);
    document.querySelector(`li[data-index="${index}"]`).remove();
    localStorage.setItem(db, JSON.stringify(data));
}




export {
    setItem,
    createEntry,
    readAllEntry,
    readItemWidthId,
    updateEntry,
    deleteEntry
}
// LocalStrage Item Name
const db = 'DATA';

/**
 * Creates and populates the < li > element
 * @param {Object} item is the entry data - that contains id, title, data, and summary
 * @param {Number} index is the entry data's id
 * @returns < li > element
 */
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

/**
 * Creates new entry
 * @param {Object} item is the entry item
 */
function createEntry(item) {
    const data = JSON.parse(localStorage.getItem(db));
    const contentList = document.querySelector('#content-list');

    data.push(item);
    item.id = new Date().getTime();
    contentList.innerHTML += setItem(item, item.id);

    localStorage.setItem(db, JSON.stringify(data));
}

/**
 * Retrieves all entries from localStorage
 * @returns List of entries
 */
function readAllEntry() {
    return JSON.parse(localStorage.getItem(db));
}

/**
 * Retrieves a specific entry by its id
 * @param {Number} id is the entry id
 * @returns the entire entry as an object
 */
function readItemWidthId (id) {
    const data =  readAllEntry();
    return data.find(item => item.id = id);
}

/**
 * Update a specific entry
 * @param {Object} item is the entry item
 * @param {Number} index is the entry id
 */
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

/**
 * Delete a specific entry by its id
 * @param {Nuber} index is the entry id
 */
function deleteEntry (index) {
    const data = JSON.parse(localStorage.getItem(db));
    const itemIdx = data.findIndex(item => item.id == index);
    data.splice(itemIdx, 1);
    document.querySelector(`li[data-index="${index}"]`).remove();
    localStorage.setItem(db, JSON.stringify(data));
}

export {
    db,
    setItem,
    createEntry,
    readAllEntry,
    readItemWidthId,
    updateEntry,
    deleteEntry
}
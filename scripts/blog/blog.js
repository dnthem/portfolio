
const data = [
    {
        title: "Something",
        date: "07/22/2022",
        summary: "Today is beatiful",
    }
];

function init() {
    const contentList = document.querySelector('#content-list');
    contentList = '';
    data.forEach(item => {
        const result = `
        <li>
            <h3> ${item.title} </h3>
            <p>
                <span>${item.date}</span>
                <br>
                Summary: ${item.summary}
            </p>
        </li>
        `;
        contentList.innerHTML += result;
    })
}
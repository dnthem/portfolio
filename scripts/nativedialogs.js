// Part 1
const alertBtn       = document.querySelector('#alert');
const confirmBtn     = document.querySelector('#confirm');
const promptBtn      = document.querySelector('#prompt');
const saferPromptBtn = document.querySelector('#safer-prompt');
const output         = document.querySelector('#output');

function printResult(result) {
    output.innerHTML = result;
}

alertBtn.addEventListener('click', () => {
    alert('You just hit the alert button!');
});

confirmBtn.addEventListener('click', () => {
    const result = confirm('You just hit confirm button');
    printResult(`
        The value returned by the confirm method: ${result}
    `);
});

promptBtn.addEventListener('click', () => {
    let result = prompt('Please, enter something: ');
    if (!result) result = "User didn't enter anything";
    printResult(`
        The value returned by the prompt method: ${result}
    `);
});

saferPromptBtn.addEventListener('click', () => {
    const dirty = prompt('Please, enter something: ');
    let result = undefined;
    if (!dirty) result = "User didn't enter anything";
    else result = DOMPurify.sanitize(dirty);
    // purify result
    printResult(`
        The value returned by the prompt method after purified: ${result}
    `);
})
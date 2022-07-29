class ButtonCount extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const btn   = document.createElement('button');
        
        style.innerHTML = `
        * {
        font-family: arial;
        }
        button {
            border: 1px solid grey;
            width: fit-content;
            background-color: #05acff;
            padding: 1rem;
            position: relative;
            cursor:pointer;
        }
        
        button:hover, button:active {
            background-color: #0273ab;
        }
        
        span::after {
            content: attr(data-counter);
            position: absolute;
            right: -.8rem;
            top: -.8rem;
            background-color: red;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }`;
        btn.innerHTML = `Click Me <span data-counter='0'></span>`;
        this.shadowRoot.append(style, btn);
        btn.addEventListener('click', () =>{
            this.shadowRoot.querySelector('span').dataset.counter++;
        });
    }
}

customElements.define('button-count', ButtonCount);


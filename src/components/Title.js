const template = document.createElement("template");

template.innerHTML = `
<style>
.title {
    font-family: Branch;
    margin: 0;
    font-size: 128px;
    color: var(--grass-500);
    position: absolute;
    z-index: 10;
    left: 64px;
    top: 0;
}
</style>

<h1 id="title" class="title">
    Allemagne
</h1>
`

export default class Title extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.headingTitle = shadowRoot.getElementById("title");
    }

    connectedCallback() {
        const string = this.headingTitle.innerText;
        const splittedText = splitText(string); 

        this.headingTitle.innerHTML = '';
        
        splittedText.forEach((span) => {
            const spanMask = document.createElement('span');
            spanMask.appendChild(span);
            this.headingTitle.appendChild(spanMask);
        });

    }
}

customElements.define("country-title", Title);

function splitText(string) {
    const splittedText = []; 

    string.split('').forEach((letter) => {
        const span = document.createElement('span');
        span.innerHTML = letter;
        splittedText.push(span);
    });

    return splittedText;
}

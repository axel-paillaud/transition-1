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

<h1 class="title">Allemagne</h1>
`

export default class Title extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("country-title", Title);

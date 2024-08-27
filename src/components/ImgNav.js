const template = document.createElement("template");

template.innerHTML = `
<style>
.nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>

<nav class="nav">
    <button id="btn-1">Picture 1</button>
    <button>Picture 2</button>
</nav>
`

export default class ImgNav extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.button = shadowRoot.getElementById("btn-1");
    }

    connectedCallback() {
        this.shadowRoot.getElementById("btn-1").addEventListener('click', () => {
            console.log("hello, world");
            console.log(this.button);
        });
    }

}

customElements.define("img-nav", ImgNav);


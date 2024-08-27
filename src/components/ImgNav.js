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

        const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
            template.content.cloneNode(true),
        );

    }
}

customElements.define("img-nav", ImgNav);

document.getElementById("btn-1").addEventListener('click', () => {
    hello();
});

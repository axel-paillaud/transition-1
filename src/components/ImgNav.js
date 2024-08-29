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
    <button id="nav-1">Picture 1</button>
    <button id="nav-2">Picture 2</button>
</nav>
`

export default class ImgNav extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.nav1 = shadowRoot.getElementById('nav-1');
        this.nav2 = shadowRoot.getElementById('nav-2');
    }

    connectedCallback() {
        this.nav1.addEventListener('click', () => {
            const customEvent = new CustomEvent('nav-1', {
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(customEvent);
            document.dispatchEvent(customEvent);
        });

        this.nav2.addEventListener('click', () => {
            const customEvent = new CustomEvent('nav-2', {
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(customEvent);
        });
    }

}

customElements.define("img-nav", ImgNav);


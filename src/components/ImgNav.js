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
    <button data-id="1">germany id 1</button>
    <button data-id="2">austria id 2</button>
</nav>
`

export default class ImgNav extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.navButtons = shadowRoot.querySelectorAll('[data-id]');
    }

    connectedCallback() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.navButtons.forEach((button) => {
            button.addEventListener('click', this.triggerSwitchImg);
        });
    }

    removeEventListeners() {
        this.navButtons.forEach((button) => {
            button.removeEventListener('click', this.triggerSwitchImg);
        }); 
    }

    triggerSwitchImg(event) {
        const customEvent = new CustomEvent('switchImg', {
            detail: { id: event.currentTarget.dataset.id },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(customEvent);
    }

}

customElements.define("img-nav", ImgNav);


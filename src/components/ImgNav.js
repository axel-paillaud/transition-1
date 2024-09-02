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
    <button data-country="germany">germany</button>
    <button data-country="austria">austria</button>
</nav>
`

export default class ImgNav extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.navButtons = shadowRoot.querySelectorAll('[data-country]');
        this.currentCountry = "germany";
    }

    connectedCallback() {
        this.addEventListeners();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.navButtons.forEach((button) => {
            button.addEventListener('click', (event) => this.triggerSwitchImg(event));
        });
    }

    removeEventListeners() {
        this.navButtons.forEach((button) => {
            button.removeEventListener('click', (event) => this.triggerSwitchImg(event));
        }); 
    }

    triggerSwitchImg(event) {
        let countryClicked = event.target.dataset.country;

        if (countryClicked === this.currentCountry) return;

        else {
            const customEvent = new CustomEvent('switchImg', {
                detail: { country: countryClicked },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(customEvent);
            this.currentCountry = countryClicked;
        }

    }

}

customElements.define("img-nav", ImgNav);


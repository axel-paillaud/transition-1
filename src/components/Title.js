const template = document.createElement("template");
import { countryObj } from '../data/country';

template.innerHTML = `
<style>
.title-container {
    font-family: Branch;
    margin: 16px 0 0 0;
    font-size: 128px;
    color: var(--grass-500);
    position: absolute;
    z-index: 10;
    left: 64px;
    top: 0;
    line-height: 1.3;
}

.container-mask {
    overflow: hidden; 
    display: inline;
}

.char {
    position: relative;
}

.mask-container {
    overflow: hidden;
}

.title {
    position: relative;
    top: 141px;
    animation: 0.9s slide-up 0.75s cubic-bezier(.17,.84,.44,1) forwards;
}

@keyframes slide-up {
    from { top: 141px; }
    to { top: 0px; }
}
</style>

<h1 class="title-container">
    <div class="mask-container">
        <span data-title="germany" class="title">Allemagne</span>
    </div>
</h1>
`

export default class Title extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.headingTitle = shadowRoot.querySelector("[data-title]");
    }

    connectedCallback() {
        document.addEventListener('switchImg', (event) => this.switchTitle(event));
    }

    disconnectedCallback() {
        document.addEventListener('switchImg', (event) => this.switchTitle(event));
    }

    switchTitle(event) {
        const country = event.detail.country;
        this.updateTitle(country);
    }

    removeTitle() {

    }

    updateTitle(country) {
        const frCountryName = countryObj[country].frName;
        this.headingTitle.innerText = frCountryName;
    }
}

customElements.define("country-title", Title);


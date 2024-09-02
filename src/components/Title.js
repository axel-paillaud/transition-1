const template = document.createElement("template");
import { countryObj, countryCssClasses } from '../data/country';

const animDelay = {
    title: {
        removeDelayInMs: 500,
        removeDelay: "0.5s",
    }
};

template.innerHTML = `
<style>
.title-container {
    font-family: Branch;
    margin: 16px 0 0 0;
    font-size: 128px;
    position: absolute;
    z-index: 10;
    left: 64px;
    top: 0;
    line-height: 1.3;
}

.austria {
    color: var(--sea-500);
}

.germany {
    color: var(--grass-500);
}

.container-mask {
    overflow: hidden; 
    display: inline;
}

.mask-container {
    overflow: hidden;
}

.title {
    position: relative;
    top: 141px;
}

.add-title {
    animation: 0.9s slide-up 0.75s cubic-bezier(.17,.84,.44,1) forwards;
}

.remove-title {
    /* animation: slide-down 0.5s cubic-bezier(.9,.03,.69,.22) forwards; */
    animation-name: slide-down;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(.9,.03,.69,.22);
}

@keyframes slide-up {
    from { top: 141px; }
    to { top: 0px; }
}

@keyframes slide-down {
    from { top: 0px; }
    to { top: 141px; }
}

</style>

<h1 class="title-container">
    <div class="mask-container">
        <span data-title="germany" class="title add-title germany">Allemagne</span>
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
        this.removeTitle();
        this.updateTitle(country);
    }

    removeTitle() {
        this.headingTitle.classList.remove('add-title');
        this.headingTitle.classList.add('remove-title');
        setTimeout(() => {
            this.headingTitle.classList.remove('remove-title');
        }, animDelay.title.removeDelayInMs);
    }

    updateTitle(country) {
        const frCountryName = countryObj[country].frName;

        // Time to let remove title animation end
        setTimeout(() => {
            this.headingTitle.classList.remove(...countryCssClasses);
            this.headingTitle.classList.add(country);

            this.headingTitle.classList.add('add-title');

            this.headingTitle.innerText = frCountryName;
            console.log("hello");

        }, animDelay.title.removeDelayInMs);
    }
}

customElements.define("country-title", Title);


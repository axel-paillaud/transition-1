import { countryObj, countryCssClasses } from '../data/country';

const animDelay = {
    title: {
        removeDurationInMs: 400,
        removeDuration: "0.4s",
    }
};

const template = document.createElement("template");

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

.title-in {
    animation: 0.9s slide-up 0.75s cubic-bezier(.17,.84,.44,1) forwards;
}

.title-out {
    animation-name: slide-down;
    animation-duration: ${animDelay.title.removeDuration};
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
        <span data-title="germany" class="title title-in germany">Allemagne</span>
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
        document.removeEventListener('switchImg', (event) => this.switchTitle(event));
    }

    switchTitle(event) {
        const country = event.detail.country;
        this.removeTitle();
        this.updateTitle(country);
    }

    removeTitle() {
        this.headingTitle.classList.remove('title-in');
        this.headingTitle.classList.add('title-out');
        setTimeout(() => {
            this.headingTitle.classList.remove('title-out');
        }, animDelay.title.removeDurationInMs);
    }

    updateTitle(country) {
        const frCountryName = countryObj[country].frName;

        // let the transition animation finish 
        setTimeout(() => {
            this.headingTitle.classList.remove(...countryCssClasses);
            this.headingTitle.classList.add(country);

            this.headingTitle.classList.add('title-in');

            this.headingTitle.innerText = frCountryName;

        }, animDelay.title.removeDurationInMs);
    }
}

customElements.define("country-title", Title);


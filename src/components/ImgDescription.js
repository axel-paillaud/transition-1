import { countryObj, countryCssClasses } from '../data/country';

const animDelay = {
    item: {
        delayOffset: 0.1,
        duration: 0.8,
        durationInMs: 800,
    }
};

const template = document.createElement("template");

template.innerHTML = `
<style>
p {
    margin: 0;
}

.description-container {
    font-family: Poppins;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.container-mask {
    overflow: hidden;
}

.desc {
    position: relative;
    top: 18px;
}

.desc-in {
    animation-name: slide-up;
    animation-duration: 0.8s;
    animation-timing-function: cubic-bezier(.17,.84,.44,1);
    animation-fill-mode: forwards;
}

.desc-out {
    animation-name: slide-down;
    animation-duration: 0.8s;
    animation-timing-function: cubic-bezier(.17,.84,.44,1);
    animation-fill-mode: forwards;
}

.desc-title {
    animation-delay: 1s;
}

.desc-date {
    animation-delay: 1.1s;
}

.desc-subdesc {
    animation-delay: 1.2s;
}

.germany {
    color: var(--grass-500);
}

.germany.desc-date, .germany.desc-subdesc {
    color: var(--grass-300);
}

.austria {
    color: var(--sea-500);
}

.austria.desc-date, .austria.desc-subdesc {
    color: var(--sea-300);
}

@keyframes slide-up {
    from { top: 18px; }
    to { top: 0px; }
}

@keyframes slide-down {
    from { top: 0px; }
    to { top: 18px; }
}
</style>

<div class="description-container">
    <div class="container-mask">
        <p data-desc class="germany desc desc-title desc-in">Sarah & Louis</p>
    </div>
    <div class="container-mask">
        <p data-desc class="germany desc desc-date desc-in">juillet 2020</p>
    </div>
    <div class="container-mask">
        <p data-desc class="germany desc desc-subdesc desc-in">Lorem ipsum dolor sit amet</p>
    </div>
</div>
`

export default class ImgDescription extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.descs = shadowRoot.querySelectorAll("[data-desc]");
    }

    connectedCallback() {
        document.addEventListener('switchImg', (event) => this.switchDesc(event.detail.country));
    }

    disconnectedCallback() {
        document.removeEventListener('switchImg', (event) => this.switchDesc(event.detail.country));
    }

    switchDesc(country) {
        this.removeDesc();
        this.updateDesc();
    }

    removeDesc() {
        let offsetDelay = 0.2;

        this.descs.forEach((desc) => {
            desc.style.animationDelay = `${offsetDelay}s`;    
            desc.classList.remove('desc-in');
            desc.classList.add('desc-out');

            offsetDelay -= 0.1;
        });
    }

    updateDesc() {
        // desc.classList.remove(...countryCssClasses);
    }
}

customElements.define("img-description", ImgDescription);

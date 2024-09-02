import germany1920Avif from "/images/germany-1920.avif";
import austria1920Avif from "/images/austria-1920.avif";

import { countryObj } from '../data/country';

const template = document.createElement("template");

const animDelay = { 
    removeLayer: {
        delay: 350, 
        duration: 500, 
        totalInMs: 850 
    },
};

template.innerHTML = `
<style>
.background-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.background-img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-image: url(${germany1920Avif});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 10;
    width: 620px;
    height: 465px;
    animation: background-forward 0.9s cubic-bezier(.79,.14,.15,.86) forwards;
}

.background-img[data-country="austria"] {
    background-image: url(${austria1920Avif});
}

.background-img[data-country="germany"] {
    background-image: url(${germany1920Avif});
}

.background-img::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--grass-500);
    opacity: 0;
    z-index: 12;
    animation: opacity-transition 0.9s ease forwards;
}

.background-img[data-country="austria"]::before {
    background-color: var(--sea-500);
}

.background-img[data-country="germany"]::before {
    background-color: var(--grass-500);
}

/* Old background-img */
.background-img::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 11;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 1;
    animation: fade-out 0.9s ease-in-out forwards;
}

.background-img[data-country="austria"]::after {
    background-image: url(${germany1920Avif});
}

.background-img[data-country="germany"]::after {
    background-image: url(${austria1920Avif});
}

.mask-layer {
    position: absolute;
    background-color: var(--ivoire);
    width: 100%;
    z-index: 15;
    height: 0px;
    animation: layer-upward 0.9s cubic-bezier(.70,.14,.15,.86) forwards;
}

.background-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 696px;
    position: relative;
    z-index: 15;
}

@keyframes background-forward {
    from { width: 620px; height: 465px; filter: blur(0px); }
    to { width: 100%; height: 100%; filter: blur(1px); }
}

@keyframes layer-upward {
    from { height: 0px; }
    to { height: 696px; }
}

@keyframes opacity-transition {
from { opacity: 0; }
to { opacity: 0.6 }
}

@keyframes fade-out {
    from { opacity: 1; }
    to {opacity: 0; }
}

</style>

<div data-bg-container class="background-container">
    <div data-bg-img class="background-img">
        <div data-layer-mask class="mask-layer"></div>
    </div>
    <div class="background-content">
        <slot></slot>
    </div>
</div>

`

export default class BackgroundImg extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.backgroundContainer = shadowRoot.querySelector("[data-bg-container]");
        this.backgroundImg = shadowRoot.querySelector("[data-bg-img]");
        this.backgroundImgMaskLayer = shadowRoot.querySelector("[data-layer-mask]");
        this.backgroundImgTemplate = this.backgroundImg.cloneNode(true);
    }

    connectedCallback() {
        document.addEventListener('switchImg', (event) => this.switchBackground(event));
    }

    disconnectedCallback() {
        document.removeEventListener('switchImg', (event) => this.switchBackground(event));
    }

    switchBackground(event) {
        const newCountry = countryObj[event.detail.country]; 
        this.triggerLayerRemoval();
        this.updateBackground(newCountry);
    }

    triggerLayerRemoval() {

        // Use javascript instead of CSS animation, to prevent immediate settings
        // of value 'height' even with the delay
        this.backgroundImgMaskLayer.animate([
            { height: '696px' },
            { height: '100%' },
        ], {
                duration: animDelay.removeLayer.duration,
                delay: animDelay.removeLayer.delay,
                fill: 'forwards',
                easing: 'cubic-bezier(.22, .61, .36, 1)'
            });
    }

    updateBackground(newCountry) {
        const newBackgroundImg = this.backgroundImgTemplate.cloneNode(true);
        newBackgroundImg.setAttribute('data-country', newCountry.name);

        // wait the layer removal animation end, before remove completely old background img
        setTimeout(() => {
            this.backgroundImg.remove();
            this.backgroundImg = newBackgroundImg;
        }, animDelay.removeLayer.totalInMs);

        this.backgroundContainer.appendChild(newBackgroundImg);
        this.backgroundImgMaskLayer = newBackgroundImg.querySelector("[data-layer-mask]");
    }
}

customElements.define("background-img", BackgroundImg);


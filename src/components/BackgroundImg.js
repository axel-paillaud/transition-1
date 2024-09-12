import { countryObj } from '../data/country';
import { animationOutDuration, animationBackground } from "../utils/animationTimeline";

const template = document.createElement("template");

template.innerHTML = `
<style>
.background-container {
    height: 100%;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    position: relative;
}

.background-img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-image: url(${countryObj.germany.backgroundImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 10;
    width: 620px;
    height: 465px;
    animation-name: background-forward;
    animation-duration: ${animationBackground.in.durationInSeconds}s;
    animation-timing-function: cubic-bezier(.79,.14,.15,.86);
    animation-fill-mode: forwards;
}

.background-img[data-country="austria"] {
    background-image: url(${countryObj.austria.backgroundImg});
}

.background-img[data-country="germany"] {
    background-image: url(${countryObj.germany.backgroundImg});
}

.background-img[data-country="slovenia"] {
    background-image: url(${countryObj.slovenia.backgroundImg});
}

.background-img::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--grass-500);
    opacity: 0;
    z-index: 12;
    animation-name: opacity-transition;
    animation-duration: ${animationBackground.in.durationInSeconds}s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}

.background-img[data-country="austria"]::before {
    background-color: var(--sea-500);
}

.background-img[data-country="germany"]::before {
    background-color: var(--grass-500);
}

.background-img[data-country="slovenia"]::before {
    background-color: var(--lake-500);
}

/* Old background-img */
.background-img::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 11;
    background-image: var(--previous-country, none);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 1;
    animation-name: fade-out;
    animation-duration: ${animationBackground.in.durationInSeconds}s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
}

.mask-layer {
    position: absolute;
    background-color: var(--ivoire);
    width: 100%;
    z-index: 15;
    height: 0px;
    animation-name: layer-upward;
    animation-duration: ${animationBackground.in.durationInSeconds}s;
    animation-timing-function: cubic-bezier(.70,.14,.15,.86);
    animation-fill-mode: forwards;
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

@media screen and (width < 1024px) {
    @keyframes background-forward {
        from { width: 512px; height: 384px; filter: blur(0px); }
        to { width: 100%; height: 100%; filter: blur(1px); }
    }
}

@media screen and (width < 640px) {
    .background-content {
        height: 576px;
    }

    @keyframes layer-upward {
        from { height: 0px; }
        to { height: 576px; }
    }

    @keyframes background-forward {
        from { width: 288px; height: 216px; filter: blur(0px); }
        to { width: 100%; height: 100%; filter: blur(1px); }
    }

}

</style>

<div data-bg-container class="background-container">
    <div data-bg-img data-country="germany" class="background-img">
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

        // let animation out finish
        setTimeout(() => {
            this.triggerLayerRemoval();
            this.updateBackground(newCountry);
        }, animationOutDuration);
    }

    triggerLayerRemoval() {

        // Use javascript instead of CSS animation, to prevent immediate settings
        // of value 'height' even with the delay
        let height = 696;
        if (window.innerWidth < 640) height = 576;

        this.backgroundImgMaskLayer.animate([
            { height: `${height}px` },
            { height: '100%' },
        ], {
                duration: animationBackground.out.duration,
                delay: animationBackground.out.delay,
                fill: 'forwards',
                easing: 'cubic-bezier(.22, .61, .36, 1)'
            });
    }

    updateBackground(newCountry) {
        const newBackgroundImg = this.backgroundImgTemplate.cloneNode(true);
        newBackgroundImg.setAttribute('data-country', newCountry.name);

        // Set dynamic previous country, to get this transition from previous to current country.
        newBackgroundImg.style.setProperty(
            '--previous-country', 
            `url(${countryObj[this.backgroundImg.dataset.country].backgroundImg})`
        );

        // wait the layer removal animation end, before remove completely old background img
        setTimeout(() => {
            this.backgroundImg.remove();
            this.backgroundImg = newBackgroundImg;
        }, animationBackground.out.totalDuration);

        this.backgroundContainer.appendChild(newBackgroundImg);
        this.backgroundImgMaskLayer = newBackgroundImg.querySelector("[data-layer-mask]");
    }
}

customElements.define("background-img", BackgroundImg);


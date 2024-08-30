import germany1920Avif from "/images/germany-1920.avif";

const template = document.createElement("template");

const animDelay = { 
    removeLayer: {
        delay: "0.35s", 
        duration: "0.5s", 
        total: "850" 
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
    /* filter: blur(1px); */
    z-index: 10;
    width: 620px;
    height: 465px;
    animation: background-forward 0.9s cubic-bezier(.79,.14,.15,.86) forwards;
    /* width: 100%; */
    /* height: 100%; */
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

.mask-layer {
    position: absolute;
    background-color: var(--ivoire);
    width: 100%;
    z-index: 15;
    height: 0px;
    animation: layer-upward 0.9s cubic-bezier(.70,.14,.15,.86) forwards;
    /* height: 696px; */
}

.mask-layer.remove-layer {
    height: 696px;
    animation-name: layer-full;
    animation-duration: ${animDelay.removeLayer.duration};
    animation-delay: ${animDelay.removeLayer.delay};
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(.22,.61,.36,1);
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
    from { width: 620px; height: 465px; }
    to { width: 100%; height: 100%; }
}

@keyframes layer-upward {
    from { height: 0px; }
    to { height: 696px; }
}

@keyframes layer-full {
    from { height: 696px; }
    to { height: 100%; }
}

@keyframes opacity-transition {
    from { opacity: 0; }
    to { opacity: 0.6 }
}

</style>

<div data-bg-container class="background-container">
    <div data-bg-img class="background-img">
        <div data-bg-layer class="mask-layer"></div>
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

        // I think remove this one, and setup only inside method
        this.backgroundLayer = shadowRoot.querySelector("[data-bg-layer]");
    }

    connectedCallback() {
        document.addEventListener('nav-1', (event) => this.switchToFirstPicture(event));
        document.addEventListener('nav-2', (event) => this.switchToSecondPicture(event));
    }

    disconnectedCallback() {
        console.log("i am disconnected");
    }

    switchToFirstPicture(event) {
        let newBackgroundImg = this.backgroundImg.cloneNode(true);

        this.backgroundLayer.classList.add('remove-layer');
        setTimeout(() => {
            this.backgroundImg.remove();
            this.backgroundImg = newBackgroundImg;
            this.backgroundLayer = newBackgroundImg.firstElementChild;
        }, animDelay.removeLayer.total);

        this.backgroundContainer.appendChild(newBackgroundImg);
    }

    switchToSecondPicture(event) {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("background-img", BackgroundImg);

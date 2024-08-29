import germany1920Avif from "/images/germany-1920.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>
.background-container {
    background-color: var(--ivoire);
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

@keyframes opacity-transition {
    from { opacity: 0; }
    to { opacity: 0.6 }
}

</style>

<div class="background-container">
    <div class="background-img">
        <div class="mask-layer"></div>
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

    }

    connectedCallback() {
        this.addEventListener('nav-1', this.switchToFirstPicture);
        this.addEventListener('nav-2', this.switchToSecondPicture);
    }

    switchToFirstPicture(event) {
        this.render();
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

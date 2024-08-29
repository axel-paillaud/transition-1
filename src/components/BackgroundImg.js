import germany1920Avif from "/images/germany-1920.avif";
import germanyPhoto from "/images/germany-768.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>
.background-container {
    background-image: url(${germany1920Avif});
    background-size: cover;
    background-position: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* Layer of background img */
.background-container::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--grass-500);
    opacity: 0.6;
    z-index: 15;
}

.background-img::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--grass-500);
    opacity: 0.6;
    z-index: 15;
}

.background-img {
    position: absolute;
    background-image: url(${germany1920Avif});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* filter: blur(1px); */
    z-index: 20;
    height: 620px;
    width: 465px;
    animation: background-rotate 1.5s forwards;
    display: none;
}

.background-content {
    background-color: var(--ivoire);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 696px;
    position: relative;
    z-index: 15;
    overflow: hidden;
}

/* Animation */

@keyframes background-rotate {
    from {
        height: 620px; 
        width: 465px;
        transform: rotate(-90deg);
    }
    to {
        width: 1536px; 
        height: 951px;
        transform: rotate(0deg);
    }
}

</style>

<div class="background-container">
    <div class="background-img"></div>
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
        console.log(event);
    }

    switchToSecondPicture(event) {
        console.log(event);
    }
}

customElements.define("background-img", BackgroundImg);

import germany1920Avif from "/images/germany-1920.avif";
import germany19201280Avif from "/images/germany-flip-1920-1280.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>
.background-container {
    background-color: grey;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.background-img {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${germany19201280Avif});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(1px);
    z-index: 10;
}

.background-img::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--grass-500);
    opacity: 0.6;
    z-index: 12;
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

        const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
            template.content.cloneNode(true),
        );

    }
}

customElements.define("background-img", BackgroundImg);

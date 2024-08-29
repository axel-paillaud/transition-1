import germanyPhoto from "/images/germany-768.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>
.photo-container {
    position: relative;
}

.container-mask {
    overflow: hidden;
}

picture {
    position: relative;
    display: block;
    top: 465px;
    animation: 1s slide-up 0.45s cubic-bezier(.86,0,.07,1) forwards;
}

img {
    display: block;
}

@keyframes slide-up {
    from { top: 465px; }
    to { top: 0px; }
}
</style>

<div class="photo-container">
    <div class="container-mask">
        <picture>
            <img src="${germanyPhoto}" alt="First photo" width="620"/>
        </picture>
    </div>
    <slot></slot>
</div>
`

export default class PhotoImg extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("photo-img", PhotoImg);


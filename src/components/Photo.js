import germanyPhoto from "/images/germany-768.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>
.photo-container {
    position: relative;
}

picture {
}
</style>

<div class="photo-container">
    <picture>
        <img src="${germanyPhoto}" alt="First photo" width="620"/>
    </picture>
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


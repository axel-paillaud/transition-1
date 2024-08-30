import germanyPhoto from "/images/germany-768.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>
.photo-container {
    position: relative;
}

.mask-container {
    overflow: hidden;
}

picture {
    position: relative;
    display: block;
    top: 465px;
    animation: 1s slide-up 0.45s cubic-bezier(.17,.84,.44,1) forwards;
    /* top: 0; */
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
    <div class="mask-container">
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

    connectedCallback() {
        document.addEventListener('nav-1', (event) => this.switchToFirstPicture(event));
        document.addEventListener('nav-2', (event) => this.switchToSecondPicture(event));
    }

    disconnectedCallback() {
        console.log("i am disconnected");
    }

    switchToFirstPicture(event) {
    }

    switchToSecondPicture(event) {
    }

}

customElements.define("photo-img", PhotoImg);


import { countryObj } from "../data/country";
import { animationOutDuration } from "../utils/animationTimeline";

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
    <div data-photo-container class="mask-container">
        <picture data-photo="germany">
            <source srcset="" />
            <img src="${countryObj.germany.photo}" alt="First photo" width="620"/>
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

        this.photo = shadowRoot.querySelector('[data-photo]');
        this.container = shadowRoot.querySelector('[data-photo-container]');
    }

    connectedCallback() {
        document.addEventListener('switchImg', (event) => this.switchPhoto(event));
    }

    disconnectedCallback() {
        document.removeEventListener('switchImg', (event) => this.switchPhoto(event));
    }

    switchPhoto(event) {
        const country = countryObj[event.detail.country];
        const newPhoto = this.photo.cloneNode(true);

        // let animation out finish
        setTimeout(() => {
            newPhoto.lastElementChild.src = country.photo;
            this.photo.remove();
            this.container.appendChild(newPhoto);
            this.photo = newPhoto;
        }, animationOutDuration);


    }

}

customElements.define("photo-img", PhotoImg);


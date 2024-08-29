const template = document.createElement("template");

template.innerHTML = `
<style>
p {
    margin: 0;
    color: var(--grass-500);
}

.description-container {
    font-family: Poppins;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.container-mask {
    overflow: hidden;
}

.item-1, .item-2 {
    position: relative;
    top: 18px;
}

.item-1 {
    animation: 0.8s slide-up 1s cubic-bezier(.17,.84,.44,1) forwards;
}

.item-2 {
    animation: 0.8s slide-up 1.2s cubic-bezier(.17,.84,.44,1) forwards;
}

@keyframes slide-up {
    from { top: 18px; }
    to { top: 0px; }
}
</style>

<div class="description-container">
    <div class="container-mask">
        <p class="item-1">Axel & Leila - juillet 2020</p>
    </div>
    <div class="container-mask">
        <p class="item-2">Lac de Plitvice</p>
    </div>
</div>
`

export default class ImgDescription extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

    }
}

customElements.define("img-description", ImgDescription);

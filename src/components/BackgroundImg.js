const template = document.createElement("template");

template.innerHTML = `
<style>
.background-img {
    background-color: grey;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background-content {
    background-color: var(--ivoire);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 696px;
}

</style>

<div class="background-img">
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

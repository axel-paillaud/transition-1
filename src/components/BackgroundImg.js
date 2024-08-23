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

</style>

<div class="background-img">
    <slot>child go here </slot>
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

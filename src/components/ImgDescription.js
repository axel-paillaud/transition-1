const template = document.createElement("template");

template.innerHTML = `
<style>
p {
    margin: 0;
}

.description-container {
    font-family: Poppins;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>

<div class="description-container">
    <p>Axel & Leila - juillet 2020</p>
    <p>Lac de Plitvice</p>
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

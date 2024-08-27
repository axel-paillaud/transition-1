const template = document.createElement("template");

template.innerHTML = `
<style>

</style>

<h1>Allemagne</h1>
`

export default class ImgDescription extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
            template.content.cloneNode(true),
        );

    }
}

customElements.define("img-descrpiption", ImgDescription);

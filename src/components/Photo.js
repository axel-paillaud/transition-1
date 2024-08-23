import germanyPhoto from "/images/germany-768.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>

</style>

<picture>
    <img src="${germanyPhoto}" alt="First photo" width="620"/>
</picture>
`

customElements.define(
    "photo-img",
    class extends HTMLElement {

        constructor() {
            super();

            const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
                template.content.cloneNode(true),
            );
        }
    },
);


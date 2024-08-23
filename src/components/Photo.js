import germanPhoto from "/images/allemagne-1920.avif";

const template = document.createElement("template");

template.innerHTML = `
<style>

</style>

<picture>
    <img src="${germanPhoto}" alt="First photo" />
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


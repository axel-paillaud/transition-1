customElements.define(
  "img-component",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("template-img");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true),
      );
    }
  },
);


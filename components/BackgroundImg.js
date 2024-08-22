customElements.define(
  "background-img",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("template-background-img");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true),
      );
    }
  },
);


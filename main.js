import "./style.css";
import viteLogo from "/vite.svg";

customElements.define(
  "my-paragraph",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("my-paragraph");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true),
      );
    }
  },
);

let app = document.getElementById("app");
let myParagraph = document.createElement("my-paragraph");

app.appendChild(myParagraph);

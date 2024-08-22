const template = document.createElement("template");
template.innerHTML = `
      <style>
        .btn-primary {
          color: white;
          background-color: blue;
          padding: 10px;
          border: none;
          border-radius: 5px;
        }
      </style>
      <button class="btn-primary">
        <slot name="btn-primary">Default button</slot>
      </button>
    `;

export class PrimaryButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("btn-primary", PrimaryButton);

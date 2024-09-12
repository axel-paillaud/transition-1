const template = document.createElement("template");

template.innerHTML = `
<style>

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid var(--grass-500); 
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 1.5s cubic-bezier(.79,.14,.15,.86) infinite;
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

</style>

<div class="loader"></div>
`

export default class SpinLoader extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("spin-loader", SpinLoader);


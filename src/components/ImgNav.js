const template = document.createElement("template");

const GAP = 16;
const PADDING = 6;
const IMAGE_WIDTH = 80;
const IMAGE_HEIGHT = 60;
const SELECT_HEIGHT = IMAGE_HEIGHT + PADDING * 2;

template.innerHTML = `
<style>
* {
    box-sizing: border-box;    
}

.nav {
    display: flex;
    flex-direction: column;
    gap: ${GAP}px;
    position: relative;
    padding: ${PADDING}px;
    align-items: center;
}

.nav-btn {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
}

.nav-img {
    pointer-events: none;
    display: block;
}

.select-square {
    position: absolute;
    z-index: 30;
    width: 100%;
    border: 1px solid var(--grass-500);
    height: ${SELECT_HEIGHT}px;
    left: 0;
    top: 0;
    pointer-events: none;
    transition: transform 0.6s cubic-bezier(.22,.61,.36,1);
}

</style>

<nav class="nav">
    <div class="select-square" id="js-select-square"></div>
    <button data-country="germany" class="nav-btn">
        <img 
            class="nav-img" 
            src="/images/germany-thumbnail.jpg" 
            alt="germany" 
            width="${IMAGE_WIDTH}"
            height="${IMAGE_HEIGHT}"
        > 
    </button>
    <button data-country="austria" class="nav-btn">
        <img 
            class="nav-img" 
            src="/images/austria-thumbnail.jpg" 
            alt="austria" 
            width="${IMAGE_WIDTH}"
            height="${IMAGE_HEIGHT}"
        >
    </button>
    <button data-country="slovenia" class="nav-btn">
        <img 
            class="nav-img" 
            src="/images/slovenia-thumbnail.jpg" 
            alt="slovenia" 
            width="${IMAGE_WIDTH}"
            height="${IMAGE_HEIGHT}"

        >
    </button>
</nav>
`

export default class ImgNav extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.navButtons = shadowRoot.querySelectorAll('[data-country]');
        this.selectSquare = shadowRoot.getElementById('js-select-square');
        this.currentCountry = "germany";
    }

    connectedCallback() {
        this.addEventListeners();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.navButtons.forEach((button, index) => {
            button.addEventListener('click', (event) => this.triggerSwitchImg(event, index));
        });
    }

    removeEventListeners() {
        this.navButtons.forEach((button) => {
            button.removeEventListener('click', (event) => this.triggerSwitchImg(event));
        }); 
    }

    triggerSwitchImg(event, index) {
        let countryClicked = event.target.dataset.country;

        if (countryClicked === this.currentCountry) return;

        else {
            this.moveSelectSquare(index);

            const customEvent = new CustomEvent('switchImg', {
                detail: { country: countryClicked },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(customEvent);
            this.currentCountry = countryClicked;
        }

    }

    moveSelectSquare(index) {
        // Formula : HEIGHTx + GAPx
        // where x = index

        let position = IMAGE_HEIGHT * index + GAP * index;
        this.selectSquare.style.transform = `translateY(${position}px)`;
    }

}

customElements.define("img-nav", ImgNav);


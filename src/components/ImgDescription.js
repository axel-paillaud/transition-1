import { countryObj, countryCssClasses } from '../data/country';

const animDelay = {
    desc: {
        delayOffset: 0.1,
        duration: 0.8,
        delayOffsetInMs: 100,
        durationInMs: 800,
    },
    descIn: {
        durationInMs: 800,
    },
    descOut: {
        durationInMs: 400,
    },
};

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

.container-mask {
    overflow: hidden;
}

.desc {
    position: relative;
    top: 18px;
}

.desc-in {
    animation-name: slide-up;
    animation-duration: 0.8s;
    animation-timing-function: cubic-bezier(.17,.84,.44,1);
    animation-fill-mode: forwards;
}

.desc-title {
    animation-delay: 1s;
}

.desc-date {
    animation-delay: 1.1s;
}

.desc-subdesc {
    animation-delay: 1.2s;
}

.germany {
    color: var(--grass-500);
}

.germany.desc-date, .germany.desc-subdesc {
    color: var(--grass-300);
}

.austria {
    color: var(--sea-500);
}

.austria.desc-date, .austria.desc-subdesc {
    color: var(--sea-300);
}

@keyframes slide-up {
    from { top: 18px; }
    to { top: 0px; }
}

</style>

<div class="description-container">
    <div class="container-mask">
        <p data-desc class="germany desc desc-title desc-in">Sarah & Louis</p>
    </div>
    <div class="container-mask">
        <p data-desc class="germany desc desc-date desc-in">juillet 2020</p>
    </div>
    <div class="container-mask">
        <p data-desc class="germany desc desc-subdesc desc-in">Lorem ipsum dolor sit amet</p>
    </div>
</div>
`

export default class ImgDescription extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.descs = shadowRoot.querySelectorAll("[data-desc]");
    }

    connectedCallback() {
        document.addEventListener('switchImg', (event) => this.switchDesc(event.detail.country));
    }

    disconnectedCallback() {
        document.removeEventListener('switchImg', (event) => this.switchDesc(event.detail.country));
    }

    switchDesc(country) {
        this.removeDesc();
        this.updateDesc(country);
    }

    removeDesc() {
        let delay = 200;

        this.descs.forEach((desc) => {

            desc.animate([
                { top: '0px' },
                { top: '19px' },
            ], {
                    duration: animDelay.descOut.durationInMs,
                    delay: delay,
                    fill: 'forwards',
                    easing: 'cubic-bezier(.55,.06,.68,.19)'
                });


            delay -= animDelay.desc.delayOffsetInMs;
        });
    }

    updateDesc() {
        let delay = 1000;

        // let the transition animation finish 
        setTimeout(() => {

            this.descs.forEach((desc) => {
                desc.animate([
                    { top: '19px' },
                    { top: '0px' },
                ], {
                        duration: animDelay.descIn.durationInMs,
                        delay: delay,
                        fill: 'forwards',
                        easing: 'cubic-bezier(.17,.84,.44,1)'
                    });


                delay += animDelay.desc.delayOffsetInMs;
            });

        }, animDelay.descOut.durationInMs);
    }
}

customElements.define("img-description", ImgDescription);

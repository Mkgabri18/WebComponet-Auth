/* Custom element selector/create */
function selectElement(element) {
    return document.querySelector(element);
}

function createNode(element) {
    return document.createElement(element);
}

function append(parentEl, childEl) {
    return parentEl.appendChild(childEl);
}

function addClasses(element, classes) {
    element.classList.add(...classes)
}

/* set style rules */
const styleRules = `
.rating {
	color: orange;
}
.wrapper {
    cursor: pointer;
}`;

class RatingStar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this._maxValue = 5;
        this._value = 0;
    }

    connectedCallback() {
        this.createComponent();
    }

    /* inner style and nodes in shadow */
    createComponent() {
        /* style in shadow */
        this.shadow.innerHTML = '';
        let style = createNode('style');
        style.innerHTML = styleRules;
        append(this.shadow, style);
        /* nodes in shadow */
        this._maxValue = parseInt(this.getAttribute("data-maxstars"));
        let starList = this.createStarList();
        append(this.shadow, starList);
    }

    createStarList() {
        let div = createNode('div');
        addClasses(div, ['wrapper']);
        /* set star selected */
        for (let i = 1; i <= this._maxValue; i++) {
            let unicodeStar = i <= this._value ? "&#x2605;" : "&#x2606;";
            let star = this.createStar(unicodeStar, i);
            div.appendChild(star);
        }
        return div;
    }

    /* add star and listener */
    createStar(starCode, index) {
        let span = createNode("span");
        addClasses(span, ['rating']);
        span.addEventListener("click", () => {
            this._value = index;
            this.createComponent()
        })
        span.innerHTML = starCode;
        return span;
    }
}

customElements.define("rating-star", RatingStar);

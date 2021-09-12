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

function openOwnModal(el) {
  let dialog = el.nextElementSibling;
  dialog.setAttribute('open', true)
}

function closeModal(element) {
  element.parentElement.removeAttribute("open");
}


const styles = `
.modal {
  display: block;
  position: fixed;
  z-index: 3000;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  font-family: Verdana,sans-serif;
  font-size: 15px;
  line-height: 1.5;
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  width: 95%;
  max-width:768px;
}
.modal-btn {
  background-color: transparent;
  color: #ddd;
  border: none;
  font-size: 1.2em;
  font-weight: normal;
}
.divheader {
  padding: 10px;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
}
.container{
  padding: 20px;
}
.btn, .button {
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}
.btn, .button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.display-topright {
  position: relative;
  right: -9px;
  top: -33px;
  float: right;
}
@media (max-width:768px){
  .modal{
    padding-top:50px;
  }
}
.animate-top{
  position:relative;
  animation:animatetop 0.4s;
}
@keyframes animatetop{
  from{top:-300px;opacity:0}
  to{top:0;opacity:1}
}`;

class ModalIn extends HTMLElement {
  constructor () {
    super();
    this._text = "title";
  }
  static get observedAttributes() {
    return ['data-id', 'data-text','max-width','width','animate'];
  }
  get dataId() {
    return this.hasAttribute('data-id');
  }
  get dataText() {
    return this.hasAttribute('data-text');
  }
  get maxWidth() {
    return this.hasAttribute('max-width');
  }
  get width() {
    return this.hasAttribute('width');
  }
  get animate() {
    return this.hasAttribute('animate');
  }
  
  remove(){
    this.parentNode.removeChild(this);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if(this.shadowRoot){
      let modalContent = this.shadowRoot.querySelector('.modal-content');
      console.log("content", modalContent)
      if (this.maxWidth) {
        modalContent.style.maxWidth = this.getAttribute('max-width');
      } else {
        modalContent.style.maxWidth = '768px';
      }

      if (this.width) {
        modalContent.style.width = this.getAttribute('width');
      } else {
        modalContent.style.width = "95%";
      }

      if (this.animate) {	
        modalContent.classList.add("animate-top");
      } else {
        modalContent.classList.remove("animate-top");
      }
    }
  }

  connectedCallback () {
    // let shadowRoot = this.attachShadow({mode: 'open'}); //!no shadow for open dialog
    /* style in shadow */
    this.createStyleNode(this, styles)
    /* template in shadow */
    this.createTemplateNode(this, 'modal-template');

    let dialog = this.querySelector('.modal-content');
    if(this.dataId) {
      dialog.setAttribute('id', this.getAttribute('data-id'));
    }
    if(this.dataText) {
      this._text = this.getAttribute('data-text');
      let title = this.querySelector('.modal-title');
      title.innerHTML = this._text;
    }
    /* if(this.maxWidth){
      modalContent.style.maxWidth = this.getAttribute('max-width');
    }

    if(this.width){
      modalContent.style.width = this.getAttribute('width');
    }

    if(this.animate){
      modalContent.classList.add("animate-top");
    }

    shadowRoot.querySelector('.btn-close').addEventListener('click', e => {
      this.style.display = 'none';
    }); */
   
   
  }

  createStyleNode(root, styleRule) {
    let style = createNode('style');
    style.innerHTML = styleRule;
    append(root, style);
  }

  createTemplateNode(root, templateRule) {
    let template = document.getElementById(templateRule);
    let templateContent = template.content;
    append(root, templateContent.cloneNode(true));
  }

}
window.customElements.define('modal-in', ModalIn);
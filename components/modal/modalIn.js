class ModalIn extends HTMLElement {
  constructor () {
    super();
    this._text = "title";
  }
  static get observedAttributes() {
    return ['data-id', 'data-title', 'data-open'];
  }
  get dataId() {
    return this.hasAttribute('data-id');
  }
  get dataTitle() {
    return this.hasAttribute('data-title');
  }
  get dataOpen() {
    return this.hasAttribute('data-open')
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if(this.shadowRoot){
      let modal = this.shadowRoot.querySelector('dialog');
      if(this.dataOpen) {
        modal.setAttribute('open', true)
      }
    }
  }

  connectedCallback () {
    let shadowRoot = this.attachShadow({mode: 'open'}); //!no shadow for open dialog
    /* template in shadow */
    this.createTemplateNode(shadowRoot);

    let dialog = this.shadowRoot.querySelector('dialog');

    dialog.addEventListener('click', (e) => {
      if(e.target.tagName == 'BUTTON') {
        dialog.removeAttribute('open');
        this.removeAttribute('data-open')
      }
    })
   
  }

  createTemplateNode(root) {
    let template = `
      <style>
        dialog {
          width: 30vw;
          min-height: 300px;
          border: 0;
          box-shadow: 0 0 5px rgba(0,0,0,0.5);
          border-radius: 5px;
          padding: 0;
        }
        .dialog-header {
          padding: 1em;
          background: rgb(85, 179, 226);
          display: flex;
        }
        h3 {
          flex-grow: 1;
          text-align: center;
          margin: 0;
        }
        .form-group {
          padding: .5em 1em;
          display: flex;
          flex-direction: column;
        }
        .form-group label,
        .form-group input {
          padding: .5em 0;
        }
      </style>
      <dialog id="${this.getAttribute("data-id")}" >
        <div class="dialog-header">
          <h3>
            ${this.getAttribute("data-title")}
          </h3>
          <button type="button">X</button>
        </div>
        <div class="dialog-body">
          <form>
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email">
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input id="pwd">
            </div>
            <div class="form-group">
              <button type="submit">Login</button>
              <button type="submit">Login with Google</button>
              <button type="submit">Login with Facebook</button>
            </div>
          </form>
        </div>
      </dialog>
    `;
    root.innerHTML = template;
  }

}
window.customElements.define('modal-in', ModalIn);
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
    let shadowRoot = this.attachShadow({mode: 'open'});
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
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
        }
        h5 {
          margin: 0;
          font-size: 1.25em;
          font-weight: 500;
        }
        .close-btn {
          text-decoration: none;
          cursor: pointer;
          opacity: 0.75;
          border: 0;
          background-color: transparent;
          font-size: 1em;
        }
        .form-group {
          padding: .5em 1em;
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          padding: 0.5em 0;
          color: #888;
        }
        .form-group input {
          padding: .5em;
        }
        .form-btn {
          padding: .5em 0;
          margin-bottom: .8em;
          background-color: #8c9299;
          border: none;
          border-radius: 0.25em;
          line-height: 1.5;
          user-select: none;
          color: #fff;
        }
        .form-btn.btn-Google { background-color: #e54848;}
        .form-btn.btn-Facebook { background-color: #0f5ccd;}
        .dialog-overlay {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.3);
        }
        :host([data-open]) .dialog-overlay {
          display: block;
        }
      </style>
      <div class="dialog-overlay"></div>
      <dialog id="${this.getAttribute("data-id")}" >
        <div class="dialog-header">
          <h5>
            ${this.getAttribute("data-title")}
          </h5>
          <button type="button" class="close-btn">X</button>
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
              <button type="submit" class="form-btn">Login</button>
              <button type="submit" class="form-btn btn-Google">Login with Google</button>
              <button type="submit" class="form-btn btn-Facebook">Login with Facebook</button>
            </div>
          </form>
        </div>
      </dialog>
    `;
    root.innerHTML = template;
  }

}
window.customElements.define('modal-in', ModalIn);
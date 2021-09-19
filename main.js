let isLogged = false;
let navBar = document.querySelectorAll('.navbar-item');

function init() {
    console.log("load page");
    //* Metodo hide link login/logout provvisorio */
    if(!isLogged) {
        navBar.forEach(el => {
            if(el.classList.contains('logged-in')) {
                el.classList.add('hidden');
            }
        })
    } else {
        navBar.forEach(el => {
            if(el.classList.contains('logged-out')) {
                el.classList.add('hidden');
            }
        })
    }
}

function openModal(idModal) {
    // const event = new Event('open', {bubbles: true, capture: false, composed: true});
    // el.dispatchEvent(event);
    // console.log(idModal, event, event.target.closest('ul'))
    let modal = document.querySelector(`[data-id="${idModal}"]`)
    modal.setAttribute('data-open', 'open')
}

init();

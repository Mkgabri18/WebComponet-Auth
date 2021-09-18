


function openModal(idModal) {
    // const event = new Event('open', {bubbles: true, capture: false, composed: true});
    // el.dispatchEvent(event);
    // console.log(idModal, event, event.target.closest('ul'))
    let modal = document.querySelector(`[data-id="${idModal}"]`)
    modal.setAttribute('data-open', 'open')
}

// document.addEventListener('open', () => {
//     console.log("sto ricevendo open dal document")
// })


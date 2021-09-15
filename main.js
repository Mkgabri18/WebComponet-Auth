


function openModal(idModal, el) {
    // const event = new Event('open', {bubbles: true, capture: false, composed: true});
    // el.dispatchEvent(event);
    // console.log(idModal, event, event.target.closest('ul'))
    document.querySelector(`dialog#${idModal}`).setAttribute('open', true)
}

// document.addEventListener('open', () => {
//     console.log("sto ricevendo open dal document")
// })
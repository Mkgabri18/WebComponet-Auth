
function openModal(idModal, el) {
    // const event = new Event('open');
    // el.dispatchEvent(event);
    console.log(idModal)
    document.querySelector(`dialog#${idModal}`).setAttribute('open', true)
}

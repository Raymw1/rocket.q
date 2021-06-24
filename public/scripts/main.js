const modalWrapper = document.querySelector(".modal-wrapper");
const checkButton = document.querySelector(".actions .check")
const modalTitle = document.querySelector(".modal > h2");
const modalDescription = document.querySelector(".modal > p");
const modalButton = document.querySelector(".modal button");
const modal = {
    open() {
        modalWrapper.classList.add("active");
    },
    close() {
        modalWrapper.classList.remove("active");
    }
}
checkButton.addEventListener("click", event => handleClick(event));

function handleClick(event) {
    event.preventDefault()
    const check= event.currentTarget.classList.value == 'check' ? true : false;
    const text = check ? "Marcar como lida" : "Excluir";
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML =`Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = check ? "Marcar como lido" : "Sim, excluir";
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}
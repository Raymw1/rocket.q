const modalWrapper = document.querySelector(".modal-wrapper");
const checkButton = document.querySelector(".actions .check")
const modalTitle = document.querySelector(".modal > h2");
const modalDescription = document.querySelector(".modal > p");
const modalButton = document.querySelector(".modal button");
const modalInputBlock = document.querySelector(".modal .input-block");
const modal = {
    open() {
        modalWrapper.classList.add("active");
    },
    close() {
        modalWrapper.classList.remove("active");
    }
}

function handleClick(event) {
    event.preventDefault()
    const check= event.currentTarget.classList.value == 'check' ? true : false;
    const text = check ? "Marcar como lida" : "Excluir";
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML =`Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    check ? modalInputBlock.classList.remove("red") : modalInputBlock.classList.add("red")
    modal.open();
    sendForm(event, check);
}

function sendForm(event, check) {
    const form = document.querySelector(".modal form");
    const roomId = document.querySelector("header #room-id").dataset.id;
    const questionId = event.currentTarget.dataset.id;
    const slug = check ? "check" : "delete";
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
}

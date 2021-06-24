const modalWrapper = document.querySelector(".modal-wrapper");
const modal = {
    open() {
        modalWrapper.classList.add("active");
    },
    close() {
        modalWrapper.classList.remove("active")
    }
}
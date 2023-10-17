
const modals = document.querySelectorAll(".modal");

function closeByEscape(evt) {
    
    if (evt.key === "Escape"){
        modals.forEach(modal => {
            closeModal(modal)
        })
    }
  }

function openModal(modal){
    modal.classList.add("modal_open");
    document.addEventListener("keydown", closeByEscape);
};

function closeModal(modal){
    modal.classList.remove("modal_open");
    document.removeEventListener("keydown", closeByEscape);

};

export {openModal as openModal};
export {closeModal as closeModal};

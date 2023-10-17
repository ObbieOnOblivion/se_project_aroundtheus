import Popup from "./popup";
const pictureModal = document.querySelector("#picture-modal");

class popupWithImage extends Popup{
    constructor(popupSelector){
        super({popupSelector})
    };

    close(){
        super.close();
    }

    open(name, template){
        super.open()
        const cardElement = template;  
        const modalContent = pictureModal.querySelector("#picture-container");
        const modalImage = modalContent.querySelector("#picture");
        const modalImageSubHeader = modalContent.querySelector("#picture-modal-description");
        const cardImageEl = cardElement.querySelector("#gallery__image");
        const cardTitleEl = cardElement.querySelector("#gallery__text");

        modalImage.src = cardImageEl.src;
        modalImage.alt = name;
        modalImageSubHeader.textContent = cardTitleEl.textContent;
    }

};

export {popupWithImage}
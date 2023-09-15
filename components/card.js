
import {openModal} from "../utils/utils.js";

const pictureModal = document.querySelector("#picture-modal");

class Card{
    constructor(name , link, template){
        this._name = name;
        this._link = link;
        this._template = template.cloneNode(true);

    }

    _addImageFunctionality(){
        const cardElement = this._template;  
        const modalContent = pictureModal.querySelector("#picture-container");
        const cardImageEl = cardElement.querySelector("#gallery__image");
        const cardTitleEl = cardElement.querySelector("#gallery__text");
        const modalImage = modalContent.querySelector("#picture");
        const modalImageSubHeader = modalContent.querySelector("#picture-modal-description");

        cardTitleEl.textContent = this._name; 
        cardImageEl.src = this._link;
        cardImageEl.alt = this._name;

        cardImageEl.addEventListener("click", () => {

            openModal(pictureModal)
            modalImage.src = cardImageEl.src;
            modalImage.alt = this._name;
            modalImageSubHeader.textContent = cardTitleEl.textContent;

        })

    }

    _addLikeFunctionality(){
        const likeButton = this._template.querySelector("#gallery__like-button");

        likeButton.addEventListener("click", () =>{
            likeButton.classList.toggle("gallery__like-button_liked");
        })
        
    }

    _addDeleteFunctionality(){

        const deleteButton = this._template.querySelector("#gallery__trash");
        deleteButton.addEventListener("click", () =>{
            const cardElement = deleteButton.closest(".gallery__card");
            if (cardElement) {
                cardElement.remove();
            }
        })

    }

    _setEventListeners(){

        this._addImageFunctionality();

        this._addLikeFunctionality();
        
        this._addDeleteFunctionality();
    }
    

    addCard(){

        this._setEventListeners();

        return (this._template);
    }
}

export {Card};

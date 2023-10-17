
import {openModal} from "../utils/utils.js";
import { popupWithImage } from "./PopupWithImage.js";

const imagePopup = new popupWithImage("#picture-modal");

class Card{
    constructor(name , link, template){
        this._name = name;
        this._link = link;
        this._template = template.cloneNode(true);

    }

    _addImageFunctionality(){
        const cardElement = this._template;  
        const cardImageEl = cardElement.querySelector("#gallery__image");
        const cardTitleEl = cardElement.querySelector("#gallery__text");

        cardTitleEl.textContent = this._name; 
        cardImageEl.src = this._link;
        cardImageEl.alt = this._name;

        cardImageEl.addEventListener("click", () => {

            imagePopup.open(this._name, this._template);

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

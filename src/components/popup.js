
import { closeModal } from "../utils/utils";
const modals = document.querySelectorAll(".modal");

export default class Popup{
    constructor({popupSelector}){
        this._popupElement = document.querySelector(popupSelector) ;
    }

    open(){
        this._popupElement.classList.add("modal_open");
    }

    close(){
        this._popupElement.classList.remove("modal_open");
    }

    _handleEscapeClose(evt){
        if (evt.key === "Escape"){
            modals.forEach(modal => {
                modal.classList.remove("modal_open");
            })
        }
    }

    setEventListeners(){
        document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt)); 
        
        console.log(this._popupElement); // lets querry selector after 

        
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
        const closebtn = modal.querySelector(".modal__close-button");
        closebtn.addEventListener("click", () =>{
            closeModal(modal);
        });

        })

    }
}
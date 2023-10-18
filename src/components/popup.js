
import { closeModal } from "../utils/utils";
const modals = document.querySelectorAll(".modal");

export default class Popup{
    constructor({popupSelector}){
        this.test1 = "#" + popupSelector; 
        this._popupElement = document.querySelector(this.test1); //starting at line 8:53 when i replace it with the raw string
        // string being: "#profile-modal__form" it does not return a null value when i run 30:9
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
        console.log(this._popupElement); 


        
        // const modals = document.querySelectorAll(".modal");
        // modals.forEach(modal => {
        // const closebtn = modal.querySelector(".modal__close-button");
        // closebtn.addEventListener("click", () =>{
        //     closeModal(modal);
        // });

        // })

    }
}

export default class Popup{
    constructor({popupSelector}){
        this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add("modal_open");
        document.addEventListener("keydown", this._handleEscClose);

    }

    close(){
        this._popupElement.classList.remove("modal_open");
        document.removeEventListener("keydown", this._handleEscapeClose); 

    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape"){
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener("click", (evt)=>{
            if (evt.target.classList.contains("modal")){
                this.close();
            }
        })

        const closeBtn = this._popupElement.querySelector(".modal__close-button")
        closeBtn.addEventListener("click", () =>{
            this.close();
        });

    }
}

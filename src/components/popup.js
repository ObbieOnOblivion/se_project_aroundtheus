
export default class Popup{
    constructor({popupSelector}){
        this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add("modal_open");
        document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt)); 

    }

    close(){
        this._popupElement.classList.remove("modal_open");
        document.removeEventListener("keydown", (evt) => this._handleEscapeClose(evt)); 

    }

    _handleEscapeClose(evt){
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

        const closebtn = this._popupElement.querySelector(".modal__close-button") // lets querry selector after 
        closebtn.addEventListener("click", () =>{
            this.close();
        });

    }
}
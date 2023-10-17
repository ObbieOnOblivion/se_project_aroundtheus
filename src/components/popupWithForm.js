import Popup from "./popup";

class popupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector}); //how to properly grab 
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = popupSelector;
        this._form = document.forms[this._popupForm];
    };

    _getInputValues(){
        let inputValues = {}
        this._form.childNodes.forEach(element =>{
            if (element.id){
                let nameElement = '';
                let descriptionElement = '';
                if(element.id.includes("modal__input_name") && element.classList.contains("modal__input")){
                    nameElement = element.value;
                }
                if(element.id.includes("modal__input_name") && element.classList.contains("modal__input")){
                    descriptionElement = element.value;
                }
                inputValues[nameElement] = descriptionElement; 
            }

        })
        return(inputValues);
    }

    close(){
        super.close();
        this._form.reset(); 
        console.log("reset fired")
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", this._handleFormSubmit);
        console.log(super._popupForm);
        console.log(this._form);

    }

};

export {popupWithForm};


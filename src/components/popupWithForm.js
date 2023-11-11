import Popup from "./popup";

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.querySelector(popupSelector).querySelector("form");
        this.popup = document.querySelector(popupSelector);

    };

    _getInputValues(){

        
        // const inputValues = {}
        // console.log(this._form)
        // this._form.childNodes.forEach(element =>{
        //     if (element.id){
        //         let nameElement = '';
        //         let descriptionElement = '';
        //         if(element.id.includes("modal__input_name") && element.classList.contains("modal__input")){
        //             nameElement = element.value;
        //         }
        //         if(element.id.includes("modal__input_name") && element.classList.contains("modal__input")){
        //             descriptionElement = element.value;
        //         }
        //         inputValues[nameElement] = descriptionElement; 
        //     }

        // })
        // return(inputValues);

        const inputList = [...this.popup.querySelectorAll('input')]
        const inputValues= {};

        
        for (const input of inputList) {
            console.log(input.id) //input.name does not work
            inputValues[inputList[0]] = inputList[1];
        }
        console.log(inputList);

        
        return inputValues;
    }

    close(){
        super.close();
        this._form.reset(); 
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", this._handleFormSubmit);
    }

};

export {PopupWithForm};


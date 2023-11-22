
class FormValidator {

    constructor(options, formElement){
        this._options = options;
        this._formElement = formElement;
        this._inputElements = NaN;
        this._checkFormValidity  = () => this._inputElements.forEach(input => input.validity.valid);

    }

    disableButton(){
        const inactiveButtonClass = this._options.inactiveButtonClass;
        const saveButton = this._formElement.querySelector(this._options.submitButtonSelector)
        saveButton.classList.add(inactiveButtonClass);
        saveButton.disabled = true;

    };


    activateButton(){
        const inactiveButtonClass = this._options.inactiveButtonClass;
        const saveButton = this._formElement.querySelector(this._options.submitButtonSelector);
        saveButton.classList.remove(inactiveButtonClass);
        saveButton.disabled = false;
    }

    _toggleButtonState(inputElements){ 
        
        function checkFormValidity(elements){
            if (elements[0].validity.valid && elements[1].validity.valid){
                return true;
            }
            else{
                return false;
            }
        }
        
        const isFormValid = checkFormValidity(inputElements);

        if(!isFormValid){
            this.disableButton();

        }
        else{
            this.activateButton();
    
        }

    }

    _showInputError(form, inputElement, {inputErrorClass, errorClass}){
        const errorMsgElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorMsgElement.textContent = inputElement.validationMessage;
        errorMsgElement.classList.add(errorClass);
    }

    _hideInputError(form, inputElement, {inputErrorClass, errorClass}){
        const errorMsgElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorMsgElement.textContent = "";
        errorMsgElement.classList.remove(errorClass);
    }

    _checkInputValidity(form, inputElement, options){
        if (!inputElement.validity.valid){
            this._showInputError(form, inputElement, options);
        }else{
            this._hideInputError(form, inputElement, options);
        }
    }

    _setEventListeners(form, options){
        const {inputSelector} = options;
        const inputElements = [...form.querySelectorAll(inputSelector)];
    
        inputElements.forEach(inputElement => {
            inputElement.addEventListener("input", ()=>{
                this._checkInputValidity(form, inputElement, options);
                this._toggleButtonState(inputElements);
            })

        })

    }

    enableValidation(){

        this._formElement.addEventListener("submit", (e)=> {
            e.preventDefault();
        });
        this._setEventListeners(this._formElement, this._options);

    }

}

export { FormValidator };

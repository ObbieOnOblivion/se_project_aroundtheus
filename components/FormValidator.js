
class FormValidator {

    constructor(options, formElement){
        this._options = options;
        this._formElement = formElement;
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
        let foundInvalid = false;
        
        inputElements.forEach((inputElement) =>{
            if (!inputElement.validity.valid){
                foundInvalid = true;
            }
        })
    
        if(foundInvalid){
            this.disableButton();

        }else{
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

const configuration = {
    formSelector: ".modal__container",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button", 
    inactiveButtonClass: "transparent",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};
const editForm = document.forms["edit-form"];
const addForm = document.forms["add-form"];
const editValidator = new FormValidator(configuration, editForm);
const addValidator = new FormValidator(configuration, addForm);
export { FormValidator, editValidator, addValidator };

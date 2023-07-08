
const config = {
    formSelector: ".modal__container",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button", 
    inactiveButtonClass: "transparent",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

function showInputError(form, inputElement, {inputErrorClass, errorClass}){
    const errorMsgElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorMsgElement.textContent = inputElement.validationMessage;
    errorMsgElement.classList.add(errorClass);
}

function hideInputError(form, inputElement, {inputErrorClass, errorClass}){ 
    const errorMsgElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMsgElement.textContent = "";
    errorMsgElement.classList.remove(errorClass);
}

function checkInputValidity(form, inputElement, options){
    if (!inputElement.validity.valid){
        showInputError(form, inputElement, options);
    }else{
        hideInputError(form, inputElement, options);
    }
}

function toggleButtonState(inputElements, editSaveButton, options){
    let foundInvalid = false;
    inactiveButtonClass = options.inactiveButtonClass;
    
    inputElements.forEach((inputElement) =>{
        if (!inputElement.validity.valid){
            foundInvalid = true;
        }
    })

    if(foundInvalid){
        editSaveButton.classList.add(inactiveButtonClass);
        editSaveButton.disabled = true;
    }else{
        editSaveButton.classList.remove(inactiveButtonClass);
        editSaveButton.disabled = false;

    }
}

function setEventListeners(form, options){
    const {inputSelector} = options;
    const inputElements = [...form.querySelectorAll(inputSelector)];
    const editSaveButton = form.querySelector(`${options.submitButtonSelector}`);


    inputElements.forEach(inputElement => {
        inputElement.addEventListener("input", ()=>{
            checkInputValidity(form, inputElement, options);
            toggleButtonState(inputElements, editSaveButton, options);
            
        })
    })
};

function enableValidation(options){
    forms = [...document.querySelectorAll(options.formSelector)];

    forms.forEach((form) =>{
        form.addEventListener("submit", (e)=> {
            e.preventDefault();
        });
    setEventListeners(form, options);
    });
}
enableValidation(config);


import {FormValidator} from "./components/FormValidator"
// import {openModal} from "./utils/utils.js";
// import {closeModal} from "./utils/utils.js";
import "./pages/index.css";
import {Section} from "./components/section.js";
import {UserInfo} from "./components/UserInfo"
import { popupWithForm } from "./components/popupWithForm.js";
import Card from "./components/Card";
import { popupWithImage } from "./components/PopupWithImage";


const galleryList = document.querySelector("#gallery__list");
const editForm = document.forms["edit-form"];
const addForm = document.forms["add-form"];



const configuration = {
    formSelector: ".modal__container",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button", 
    inactiveButtonClass: "transparent",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};
const editValidator = new FormValidator(configuration, editForm);
const addValidator = new FormValidator(configuration, addForm);


editValidator.enableValidation();
addValidator.enableValidation();

const items = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg", 
    },

    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg", 
    },

    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg", 
    },

    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg", 
    },

    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg", 
    },

    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg", 
    },
];

(function displayCards(){
    // Elements
    
    const modals = document.querySelectorAll(".modal");
    const profile = document.querySelector("#profile");
    const profileEditButton = profile.querySelector("#profile__edit_button");
    const profileAddButton = profile.querySelector("#profile__add_button");
    const profileName = profile.querySelector("#profile__name");
    const profileDescription = profile.querySelector("#profile__description");
    const profileEditModal = document.querySelector("#profile-modal");
    const profileAddModal = document.querySelector("#add-modal");
    const modalInputName = profileEditModal.querySelector("#profile-modal__input_name");
    const addModalInputName = document.querySelector("#place-modal__input_name");
    const modalInputDescription = profileEditModal.querySelector("#profile-modal__input_description");
    const addModalInputDestination = document.querySelector("#place-modal__input_description");
    const placeModalSaveBtn = document.querySelector("#modal__place-save-button")
    const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
    const pictureModal = document.querySelector("#picture-modal");

    const editPopup = new popupWithForm(`#${editForm.parentElement.id}`, handleProfileEditSubmit);
    const addPopup = new popupWithForm(`#${addForm.parentElement.id}`, handleProfileAddSubmit);

    editPopup._getInputValues();
    addPopup._getInputValues();

    placeModalSaveBtn.disabled = true;
    placeModalSaveBtn.classList.add("transparent");

    const initialSection = new Section({items, renderer: (cardData) =>{
        const modelCard = new Card(cardData.name, cardData.link, cardTemplate);
        const modelImage = modelCard.addCard().querySelector("img");
        //question involvs commented code bellow; 
        // console.log(modelImage)
        // modelImage.addEventListener("click", ()=>{
        //     //add image popup eventlisteners 
        // }
        // )
        initialSection.addItem(modelCard.addCard())
    }}, galleryList)
    initialSection.renderItems();
    console.log(initialSection._items);

    //functions
    
    function handleProfileEditSubmit(event){
        event.preventDefault();
        const userInfo = new UserInfo()
        userInfo.getUserInfo();
        userInfo.setUserInfo();
        profileName.textContent = modalInputName.value;
        profileDescription.textContent = modalInputDescription.value;
        editPopup.close()
    };

    function handleProfileAddSubmit(event){
        event.preventDefault();
        const items = [{name: String(addModalInputName.value), link: String(addModalInputDestination.value)}];
        initialSection._items = items; //change the underscore
        initialSection.renderItems();
        addValidator.disableButton();
        addPopup.close();
        event.target.reset();

    }
    
    //event listeners
    
    profileEditButton.addEventListener("click", () => {
        modalInputName.value = profileName.textContent;
        modalInputDescription.value = profileDescription.textContent;
        // openModal(profileEditModal);
        editPopup.open();
    });

    profileAddButton.addEventListener("click", () =>{
        // openModal(profileAddModal);
        addPopup.open();
    });

    editPopup.setEventListeners();
    
    addPopup.setEventListeners();

})()


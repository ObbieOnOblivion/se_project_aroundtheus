
import {FormValidator} from "./components/FormValidator"
import "./pages/index.css";
import {Section} from "./components/Section.js";
import {UserInfo} from "./components/UserInfo"
import { PopupWithForm } from "./components/PopupWithForm.js";
import Card from "./components/Card";
import { PopupWithImage } from "./components/PopupWithImage";


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
    const imagePopup = new PopupWithImage("#picture-modal");


    const editPopup = new PopupWithForm(`#${editForm.parentElement.id}`, handleProfileEditSubmit);
    const addPopup = new PopupWithForm(`#${addForm.parentElement.id}`, handleProfileAddSubmit);
    const userInfo = new UserInfo(profileName, profileDescription);
    const userData = userInfo.getUserInfo();

    imagePopup.setEventListeners();

    //functions

    function createCard(name, description, template){
        const modelCard = new Card(name, description, template);
        cardsSection.addItem(modelCard.addCard())

    }
    
    function handleProfileEditSubmit(event){
        event.preventDefault();
        userInfo.setUserInfo({name: modalInputName.value, about: modalInputDescription.value})
        editPopup.close()
    };

    function handleProfileAddSubmit(event){
        event.preventDefault();

        createCard(addModalInputName.value, addModalInputDestination.value, cardTemplate)

        addPopup.close();
    }
    
    //event listeners
    
    profileEditButton.addEventListener("click", () => {

        editPopup.open();
    });

    profileAddButton.addEventListener("click", () =>{
        addPopup.open();
        addValidator.disableButton();
    });

    editPopup.setEventListeners();
    
    addPopup.setEventListeners();

    const cardsSection = new Section({items, renderer: (cardData) =>{
        createCard(cardData.name, cardData.link, cardTemplate);
    }}, galleryList)
    cardsSection.renderItems();


})()


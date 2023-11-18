
import {FormValidator} from "./components/FormValidator"
// import {openModal} from "./utils/utils.js";
// import {closeModal} from "./utils/utils.js";
import "./pages/index.css";
import {Section} from "./components/section.js";
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

    const editPopup = new PopupWithForm(`#${editForm.parentElement.id}`, handleProfileEditSubmit);
    const addPopup = new PopupWithForm(`#${addForm.parentElement.id}`, handleProfileAddSubmit);
    const userInfo = new UserInfo(profileName, profileDescription);
    const savedInfo = new UserInfo(modalInputName, modalInputDescription);

    const cardsSection = new Section({items, renderer: (cardData) =>{
        const modelCard = new Card(cardData.name, cardData.link, cardTemplate);
        const modelImage = modelCard.addCard().querySelector("img");
        //question involvs line 93-96
        // console.log(modelImage)
        modelImage.addEventListener("click", ()=>{
            console.log("event will not trigger")
        });
        
        cardsSection.addItem(modelCard.addCard())
    }}, galleryList)
    cardsSection.renderItems();

    //functions
    
    function handleProfileEditSubmit(event){
        event.preventDefault();
        profileName.textContent = savedInfo.getUserInfo().name;
        profileDescription.textContent = savedInfo.getUserInfo().about;
        console.log(savedInfo.getUserInfo().name);

        // userInfo.setUserInfo(userInfo.getUserInfo);
        // userInfo.setUserInfo();
        // profileName.textContent = modalInputName.value;
        // profileDescription.textContent = modalInputDescription.value;
        editPopup.close()
    };

    function handleProfileAddSubmit(event){
        event.preventDefault();
        // const items = [{name: String(addModalInputName.value), link: String(addModalInputDestination.value)}];
        // initialSection._items = items; //change the underscore
        // initialSection.renderItems();

        const modelCard = new Card(String(addModalInputName.value), String(addModalInputDestination.value), cardTemplate);
        console.log(modelCard.addCard());
        cardsSection.addItem(modelCard.addCard())

        addPopup.close();
    }
    
    //event listeners
    
    profileEditButton.addEventListener("click", () => {
        console.log(userInfo.getUserInfo())
        // modalInputName.value = profileName.textContent;
        // modalInputDescription.value = profileDescription.textContent;


        modalInputName.value = userInfo.getUserInfo().name;
        modalInputDescription.value = userInfo.getUserInfo().about;

        // profileName.textContent = savedInfo.getUserInfo.name;
        // savedInfo.setUserInfo(userInfo.getUserInfo())
        // userInfo.getUserInfo()
         

        // userInfo.getUserInfo(profileName.textContent, profileDescription.textContent)
        // userInfo.setUserInfo(modalInputName.value, modalInputDescription.value)
        // openModal(profileEditModal);
        editPopup.open();
    });

    profileAddButton.addEventListener("click", () =>{
        // openModal(profileAddModal);
        addPopup.open();
        addValidator.disableButton();
    });

    editPopup.setEventListeners();
    
    addPopup.setEventListeners();

})()


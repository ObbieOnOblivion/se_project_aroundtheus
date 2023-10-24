
import { editValidator, addValidator } from "./components/FormValidator.js";
import {openModal} from "./utils/utils.js";
import {closeModal} from "./utils/utils.js";
import "./pages/index.css";
import {section} from "./components/section.js";
import {UserInfo} from "./components/UserInfo"
import { popupWithForm } from "./components/popupWithForm.js";
import Card from "./components/Card";


const galleryList = document.querySelector("#gallery__list");


editValidator.enableValidation();
addValidator.enableValidation();

let items = [
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
    const editForm = document.forms["edit-form"];
    const placeModalSaveBtn = document.querySelector("#modal__place-save-button")
    const cardTemplate = document.querySelector("#card-template").content.firstElementChild; // template equivelant section
    const addForm = document.forms["add-form"];

    placeModalSaveBtn.disabled = true;
    placeModalSaveBtn.classList.add("transparent");

    //functions
    
    function handleProfileEditSubmit(event){
        event.preventDefault();
        const userInfo = new UserInfo()
        userInfo.getUserInfo();
        userInfo.setUserInfo();
        profileName.textContent = modalInputName.value;
        profileDescription.textContent = modalInputDescription.value;
        closeModal(profileEditModal);
    };

    function handleProfileAddSubmit(event){
        event.preventDefault();
        items = [{name: String(addModalInputName.value), link: String(addModalInputDestination.value)}];
        const addSection = new section({items, renderer: (cardData) =>{
            let cardList = [];
            // console.log(cardList);
            const modelCard = new Card(cardData.name, cardData.link, cardTemplate);
            cardList.push(modelCard.addCard());
            // console.log(cardList);
        }}, galleryList);
        // addSection.addItem();
        addValidator.disableButton();
        closeModal(profileAddModal);
        event.target.reset();

    }
    
    //event listeners

    const editPopup = new popupWithForm(editForm.id, handleProfileEditSubmit);
    const addPopup = new popupWithForm(addForm.id, handleProfileAddSubmit);

    modals.forEach((modal) => {
        modal.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('modal')) {
                closeModal(modal);
            }
        })

    })
    
    profileEditButton.addEventListener("click", () => {
        modalInputName.value = profileName.textContent;
        modalInputDescription.value = profileDescription.textContent;
        openModal(profileEditModal);
    });

    profileAddButton.addEventListener("click", () =>{
        openModal(profileAddModal);
    });

    editPopup.setEventListeners();
    
    addPopup.setEventListeners();
    
    const initialSection = new section({items, renderer: (cardData) =>{
        const modelCard = new Card(cardData.name, cardData.link, cardTemplate);
        let cardList = []; //potentially dont need this
        // console.log(cardList);
        galleryList.prepend(modelCard.addCard());
        console.log(galleryList.childElementCount);
    }}, galleryList)
    initialSection.addItem();

})()


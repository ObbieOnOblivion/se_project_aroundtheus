
import { Card } from "../components/Card.js";
import { editValidator, addValidator } from "../components/FormValidator.js";
import {openModal} from "../utils/utils.js";
import {closeModal} from "../utils/utils.js";
import {Section} from "./section.js";


const galleryList = document.querySelector("#gallery__list");
const template = document.querySelector("#card-template").content.firstElementChild;


editValidator.enableValidation();
addValidator.enableValidation();

const initialCards = [
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
    const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
    const addForm = document.forms["add-form"];

    placeModalSaveBtn.disabled = true;
    placeModalSaveBtn.classList.add("transparent");

    //functions
    
    function handleProfileEditSubmit(event){
        event.preventDefault();
        profileName.textContent = modalInputName.value;
        profileDescription.textContent = modalInputDescription.value;
        closeModal(profileEditModal);
    };


    function addCard(firstInput, lastInput, template ) {
        const modelCard = new Card(firstInput, lastInput, template);
        galleryList.prepend(modelCard.addCard()); // would not need this, add to an array;
    }

    function handleProfileAddSubmit(event){
        event.preventDefault();
        addCard(addModalInputName.value, addModalInputDestination.value, cardTemplate);
        addValidator.disableButton();
        closeModal(profileAddModal);
        event.target.reset();

    }
    
    //event listeners

    modals.forEach((modal) => {
        modal.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('modal')) {
                closeModal(modal);
            }
        })

        const closebtn = modal.querySelector(".modal__close-button");
        closebtn.addEventListener("click", () =>{
            closeModal(modal);
        });
    })
    
    profileEditButton.addEventListener("click", () => {
        modalInputName.value = profileName.textContent;
        modalInputDescription.value = profileDescription.textContent;
        openModal(profileEditModal);
    });

    editForm.addEventListener("submit", handleProfileEditSubmit);
    
    addForm.addEventListener("submit", handleProfileAddSubmit);
    
    profileAddButton.addEventListener("click", () =>{
        openModal(profileAddModal);

    });

    initialCards.forEach(item =>{
        addCard(item.name, item.link, template);
    });
    

})()

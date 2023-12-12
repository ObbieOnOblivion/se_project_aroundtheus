import { FormValidator } from "../components/FormValidator";
import "./index.css";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Card from "../components/Card";
import { PopupWithImage } from "../components/PopupWithImage";
import { Api } from "../components/Api";




const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
    "Content-Type": "application/json"
  }});



(function displayCards() {
  // Elements
  const imageClickHandler = ({ name, link }) => {
    imagePopup.open({ name, link });
  };
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  const galleryList = document.querySelector("#gallery__list");

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

  const cardsSection = new Section(
    {
      items,
      renderer: (cardData) => {
        createCard(cardData.name, cardData.link, cardTemplate);
      },
    },
    galleryList
  );
  cardsSection.renderItems();

  const editForm = document.forms["edit-form"];
  const addForm = document.forms["add-form"];

  const configuration = {
    formSelector: ".modal__container",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "transparent",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const editValidator = new FormValidator(configuration, editForm);
  const addValidator = new FormValidator(configuration, addForm);



  editValidator.enableValidation();
  addValidator.enableValidation();

  const profile = document.querySelector("#profile");
  const profileEditButton = profile.querySelector("#profile__edit_button");
  const profileAddButton = profile.querySelector("#profile__add_button");
  const profileName = profile.querySelector("#profile__name");
  const profileDescription = profile.querySelector("#profile__description");

  const imagePopup = new PopupWithImage("#picture-modal");

  const editPopup = new PopupWithForm(
    `#${editForm.parentElement.id}`,
    handleProfileEditSubmit
  );
  const addPopup = new PopupWithForm(
    `#${addForm.parentElement.id}`,
    handleProfileAddSubmit
  );

  imagePopup.setEventListeners();

  //functions

  function createCard(name, description, template) {
    const createCard = (name, description, option1 = template, option2 = imageClickHandler ) =>{
    const modelCard = new Card(name, description, option1, option2);
    cardsSection.addItem(modelCard.addCard());}

    api.addCardInfo(name, description, createCard);
    // console.log(api._cardInfo)
    // api.getCardInfo();  // am i using unnessecary requests why returning 30 items 
    
  }

  function handleProfileEditSubmit(inputElements) {
    editPopup.close();
    api.aboutElement = profileDescription;
    api.nameElement = profileName
    api.setUserInfo(inputElements["name"], inputElements["description"], profileName, profileDescription); //change the name
  }

  function handleProfileAddSubmit({ name, description }) {
    createCard(name, description, cardTemplate);
    addPopup.close();
  }

  //event listeners

  profileEditButton.addEventListener("click", () => {
    editPopup.setPreviewedValues({
      name: profileName.innerText,
      description: profileDescription.innerText,
    });
    editPopup.open();
  });

  profileAddButton.addEventListener("click", () => {
    addPopup.open();
    addValidator.disableButton();
  });

  editPopup.setEventListeners();

  addPopup.setEventListeners();
})();

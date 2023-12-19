import { FormValidator } from "../components/FormValidator";
import "./index.css";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Card from "../components/Card";
import { PopupWithImage } from "../components/PopupWithImage";
import { Api } from "../components/Api";
import { UserInfo } from "../components/UserInfo";
import { confirmationPopup } from "../components/confirmationPopup";
import { avatarPopup } from "../components/AvatarPopup";


(function displayCards() {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
      "Content-Type": "application/json",
    },
  });

  const editAvatarPopup = new avatarPopup(".modal-avatar", chageAvatar); // try to incorporate PopupWithForm
  const avatarPhoto = document.querySelector(".profile__avatar");
  
  function chageAvatar(inputValue){
    avatarPhoto.src = inputValue;
    api.changeAvatar(inputValue);
  }
  
  avatarPhoto.addEventListener("click", () =>{
    editAvatarPopup.open();
    editAvatarPopup.setEventListeners();
  })
  
  function toggleLikeButton(name, link){ 
    api.getCardInfo(name, link, false ,true)
  }
  
  function triggerConfirmation(deleteCard, name, link){ //refactor
    const apiDelete = () =>{
      api.getCardInfo(name, link, true); 
    }
    const confirmPopup = new confirmationPopup("#confirmation-modal", deleteCard, apiDelete);
    confirmPopup.open();
    confirmPopup.setEventListeners();
  
  }
  
  // Elements
  const imageClickHandler = ({ name, link }) => {
    imagePopup.open({ name, link });
  };
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  const galleryList = document.querySelector("#gallery__list");

  api.test();

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
        addCard(cardData.name, cardData.link, cardTemplate);
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
  const user = new UserInfo(profileName, profileDescription);

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

  //preset profile info on load 
  api.getProfileInfo().then((results) => {
    console.log(results);
    profileName.textContent = results.name;
    profileDescription.textContent = results.about;
    avatarPhoto.src = results.avatar;
  });

  //functions

  function addCard(name, description, template) {
    const modelCard = new Card(name, description, template, imageClickHandler);
    cardsSection.addItem(modelCard.addCard());
  }

  function createCard(name, description, template) {
    const addItem = (
      name,
      description,
      option1 = template,
      option2 = imageClickHandler
    ) => {
      const modelCard = new Card(name, description, option1, option2, triggerConfirmation, toggleLikeButton); 
      cardsSection.addItem(modelCard.addCard());
    };

    api.addCardInfo(name, description, addItem);
  }

  function handleProfileEditSubmit(inputElements) {
    editPopup.close();

    api
      .setUserInfo(inputElements.name, inputElements.description)
      .then((result) => {
        user.setUserInfo({ name: result.name, about: result.about });
      });
  }

  function handleProfileAddSubmit({ name, description }) {
    createCard(name, description, cardTemplate);
    addPopup.close();
  }

  //event listeners

  profileEditButton.addEventListener("click", () => {
    api.getProfileInfo().then((data) =>{
      console.log(data);
      editPopup.setPreviewedValues({
        //api 
        name: data.name,
        description: data.about,
      });
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


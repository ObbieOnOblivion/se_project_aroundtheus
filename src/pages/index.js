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

  let initialCardsInfo = NaN;


  api.getInitialcards().then((items) =>{
    // handle the response 
    initialCardsInfo = items;
    console.log(initialCardsInfo);
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
    
  })

  // try to incorporate PopupWithForm {problems with inputvalues}
  const editAvatarPopup = new avatarPopup("#avatar-modal", chageAvatar); 
  const avatarPhoto = document.querySelector(".profile__avatar");
  
  function chageAvatar(inputValue){
    console.log(inputValue);
    avatarPhoto.src = inputValue;
    api.changeAvatar(inputValue);
  }
  
  avatarPhoto.addEventListener("click", () =>{
    editAvatarPopup.open();
    editAvatarPopup.setEventListeners();
  })
  // api.returnCardIsLiked("Bald Mountains", "https://practicum-content.s3.us-west-1.amazonaws.c…ftware-engineer/around-project/bald-mountains.jpg")

  // function ggtoggleLikeButton(name, link){
  //   api.returnCardIsLiked(name, link)
  //   .then((res) => {
  //     console.log(res)
  //   })
  // }

  function ggtoggleLikeButton(){

  }
  
  function toggleLikeButton(name, link, fillButton, vacateButton){ 

    api.toggleHeartIcon(name, link, fillButton, vacateButton)
  }
  
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
  
  // const cardsSection = new Section(
  //   {
  //     items,
  //     renderer: (cardData) => {
  //       addCard(cardData.name, cardData.link, cardTemplate);
  //     },
  //   },
  //   galleryList
  // );
  // cardsSection.renderItems();

  const editForm = document.forms["edit-form"];
  const addForm = document.forms["add-form"];
  const avatarForm = document.forms["avatar-form"];
  console.log(avatarForm);

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
  const avatarValidator = new FormValidator(configuration, avatarForm);

  editValidator.enableValidation();
  addValidator.enableValidation();
  avatarValidator.enableValidation();

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
  // api.setLikeButton();

  //functions

  function addCard(name, description, template) {
    const cardsSection = new Section(
      {
        items,
        renderer: (cardData) => {
          addCard(cardData.name, cardData.link, cardTemplate);
        },
      },
      galleryList
    );

    const modelCard = new Card(name, description, template, imageClickHandler, api.deleteCard, toggleLikeButton, 
      initialCardsInfo);
    cardsSection.addItem(modelCard.addCard());
  }

  function createCard(name, description, template) {
    const addItem = (
      name,
      description,
      option1 = template,
      option2 = imageClickHandler
    ) => {
      const modelCard = new Card(name, description, option1, option2, api.deleteCard, toggleLikeButton,
        initialCardsInfo); 
      cardsSection.addItem(modelCard.addCard());
    };

    // api.addCardInfo(name, description)
    // .then((res) => {
    //   // add to the dom 
    // })
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



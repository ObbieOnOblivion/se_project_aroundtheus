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

  api.getInitialcards().then((items) => {
    // handle the response
    initialCardsInfo = items.reverse();
    console.log(initialCardsInfo);
    const cardsSection = new Section(
      {
        items,
        renderer: (cardData) => {
          console.log("---- oo ----", cardData._id);
          addCard(cardData.name, cardData.link, cardTemplate, cardData._id);
        },
      },
      galleryList
    );
    cardsSection.renderItems();
  });

  // try to incorporate PopupWithForm {problems with inputvalues}
  const editAvatarPopup = new avatarPopup("#avatar-modal", chageAvatar);
  const avatarPhoto = document.querySelector(".profile__avatar");

  function chageAvatar(inputValue) {
    console.log(inputValue);
    avatarPhoto.src = inputValue;
    api.changeAvatar(inputValue);
  }

  avatarPhoto.addEventListener("click", () => {
    editAvatarPopup.open();
    editAvatarPopup.setEventListeners();
  });

  function toggleLikeButton(id, fillButton, vacateButton) {
    api.toggleHeartIcon(id, fillButton, vacateButton);
  }

  // Elements
  const imageClickHandler = ({ name, link }) => {
    imagePopup.open({ name, link });
  };
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  const galleryList = document.querySelector("#gallery__list");

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

  const avatarConfiguration = {
    formSelector: ".modal-avatar__container",
    inputSelector: ".modal-avatar__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "transparent",
    nputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  }

  const editValidator = new FormValidator(configuration, editForm);
  const addValidator = new FormValidator(configuration, addForm);
  const avatarValidator = new FormValidator(avatarConfiguration, avatarForm);

  editValidator.enableValidation();
  addValidator.enableValidation();
  avatarValidator.enableValidation();

  // console.log(avatarValidator.)

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
  const deletePopup = new confirmationPopup("#confirmation-modal");
  deletePopup.setEventListeners();

  function addCard(name, description, template, id) {

    const modelCard = new Card(
      name,
      description,
      template,
      imageClickHandler,
      (card) => {
        console.log(card._id);

        // api.deleteCard(card._id, card.deleteCard()); // 
        deletePopup.open();
        deletePopup.setSubmitAction(() =>{
          api.deleteCard(card._id).then(() =>{
            card.deleteCard();
            deletePopup.close();
          })
        })

      },
      toggleLikeButton,
      initialCardsInfo,
      id
    );

    galleryList.prepend(modelCard.addCard());
  }

  function createCard(name, description, template) {
    api.addCardInfo(name, description, (name, link, id) => {
      console.log(template);
      addCard(name, link, template, id);
    }).then(
      addPopup.saveButton.textContent = "Saving..."
    )
  }
  // editPopup.saveButton.textContent = "Submit";
  // addPopup.saveButton.textContent = "Submit";

  function handleProfileEditSubmit(inputElements) {
    // const saveButton = editPopup.querySelector(".modal__save-button");
    console.log(editPopup)
    api
      .setUserInfo(inputElements.name, inputElements.description)
      .then((result) => {
        user.setUserInfo({ name: result.name, about: result.about });
      })
      .then(
        editPopup.saveButton.textContent = "Saving..."
      );
      editPopup.close();

  }

  function handleProfileAddSubmit({ name, description }) {
    createCard(name, description, cardTemplate);
    addPopup.close();
  }

  //event listeners

  profileEditButton.addEventListener("click", () => {
    api.getProfileInfo().then((data) => {
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

  console.log(api.test());
})();

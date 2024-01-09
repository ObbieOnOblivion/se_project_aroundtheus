import { FormValidator } from "../components/FormValidator";
import "./index.css";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Card from "../components/Card";
import { PopupWithImage } from "../components/PopupWithImage";
import { Api } from "../components/Api";
import { UserInfo } from "../components/UserInfo";
import { confirmationPopup } from "../components/ConfirmationPopup";
import * as Constants from "../utils/Constants";

(function displayCards() {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
      "Content-Type": "application/json",
    },
  });
  let initialCardsInfo = NaN;
  const cardsSection = new Section(
    {
      initialCardsInfo,
      renderer: (cardData) => {
        addCard(
          cardData.name,
          cardData.link,
          Constants.cardTemplate,
          cardData._id
        );
      },
    },
    Constants.galleryList
  );

  api
    .getInitialcards()
    .then((items) => {
      initialCardsInfo = items.reverse();
      cardsSection.items = items;
      cardsSection.renderItems();
    })
    .catch((error) => {
      console.error("Caught an error: ", error.message);
    });

  const editAvatarPopup = new PopupWithForm("#avatar-modal", chageAvatar);

  function chageAvatar(inputValue) {
    api
      .changeAvatar(inputValue.UrlInput)
      .then(() => {
        user.setAvatar(inputValue.UrlInput);
      })
      .then(() => {
        editAvatarPopup.close();
      })
      .catch((error) => {
        console.error("Caught an error: ", error.message);
      })
      .finally(() => {
        editAvatarPopup.submitBtn.textContent = "Saving...";
      });
  }

  function throwInputError(validator){
    if (validator.inputElements.length == 1){
      validator.showInputError(validator.inputElements[0]);
    }else{
      validator.inputElements.forEach( input => {
        validator.showInputError(input);
      })
    }
  }

  editAvatarPopup.setEventListeners();

  Constants.avatarPhoto.addEventListener("click", () => {
    editAvatarPopup.open();
    avatarValidator.disableButton();
  });

  function toggleLikeButton(id, fillButton, vacateButton) {
    api.toggleHeartIcon(id, fillButton, vacateButton).catch((error) => {
      console.error("Caught an error: ", error.message);
    });
  }

  // Elements
  const imageClickHandler = ({ name, link }) => {
    imagePopup.open({ name, link });
  };

  const editValidator = new FormValidator(
    Constants.configuration,
    Constants.editForm
  );
  const addValidator = new FormValidator(
    Constants.configuration,
    Constants.addForm
  );
  const avatarValidator = new FormValidator(
    Constants.configuration,
    Constants.avatarForm
  );
  const user = new UserInfo(
    Constants.profileName,
    Constants.profileDescription,
    Constants.avatarPhoto
  );

  editValidator.enableValidation();
  addValidator.enableValidation();
  avatarValidator.enableValidation();

  const imagePopup = new PopupWithImage("#picture-modal");

  const editPopup = new PopupWithForm(
    `#${Constants.editForm.parentElement.id}`,
    handleProfileEditSubmit
  );
  const addPopup = new PopupWithForm(
    `#${Constants.addForm.parentElement.id}`,
    handleProfileAddSubmit
  );

  imagePopup.setEventListeners();

  api
    .getProfileInfo()
    .then((results) => {
      user.setUserInfo({ name: results.name, about: results.about });
      user.setAvatar(results.avatar);
    })
    .catch((error) => {
      console.error("Caught an error: ", error.message);
    });

  //functions
  const deletePopup = new confirmationPopup("#confirmation-modal");
  deletePopup.setEventListeners();

  function addCard(name, description, template, id) {
    const items = [{ name: name, description: description }];
    const modelCard = new Card(
      name,
      description,
      template,
      imageClickHandler,
      (card) => {
        deletePopup.open();
        deletePopup.setDefaultSaveButton();
        deletePopup.setSubmitAction(() => {
          api
            .deleteCard(card.id)
            .then(() => {
              card.deleteCard();
            })
            .then(() => {
              deletePopup.updateSaveButton();
            })
            .then(() => {
              deletePopup.close();
            })
            .catch((error) => {
              console.error("Caught an error: ", error.message);
            });
        });
      },
      toggleLikeButton,
      initialCardsInfo,
      id
    );
    cardsSection.items = items;
    cardsSection.addItem(modelCard.generateCard());
  }

  function createCard(name, description, template) {
    return api
      .addCardInfo(name, description, (name, link, id) => {
        addCard(name, link, template, id);
      })
      .catch((error) => {
        console.error("Caught an error: ", error.message);
      })
      .finally(() => {
        addPopup.submitBtn.textContent = "Saving...";
      });
  }

  function handleProfileEditSubmit(inputElements) {
    api
      .setUserInfo(inputElements.name, inputElements.description)
      .then((result) => {
        user.setUserInfo({ name: result.name, about: result.about });
      })
      .then(() => {
        editPopup.close();
      })
      .catch((error) => {
        console.error("Caught an error: ", error.message);
      })
      .finally(() => {
        editPopup.submitBtn.textContent = "Saving...";
      });
  }

  function handleProfileAddSubmit({ name, description }) {
    createCard(name, description, Constants.cardTemplate).then(
      addPopup.close()
    );
  }

  //event listeners

  Constants.profileEditButton.addEventListener("click", () => {
    const data = user.getUserInfo();
    editPopup.setPreviewedValues({
      name: data.name,
      description: data.about,
    });
    editPopup.open();
  });

  Constants.profileAddButton.addEventListener("click", () => {
    addPopup.open();
    addValidator.disableButton();
    throwInputError(addValidator);
  });

  editPopup.setEventListeners();

  addPopup.setEventListeners();
})();

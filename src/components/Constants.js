const configuration = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "transparent",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profile = document.querySelector("#profile");
const profileEditButton = profile.querySelector("#profile__edit_button");
const profileAddButton = profile.querySelector("#profile__add_button");
const profileName = profile.querySelector("#profile__name");
const profileDescription = profile.querySelector("#profile__description");
const avatarPhoto = document.querySelector(".profile__avatar");
const cardTemplate =
document.querySelector("#card-template").content.firstElementChild;
const galleryList = document.querySelector("#gallery__list");

const editForm = document.forms["edit-form"];
const addForm = document.forms["add-form"];
const avatarForm = document.forms["avatar-form"];

export {
  configuration,
  profileEditButton,
  profileAddButton,
  profileName,
  profileDescription,
  avatarPhoto, 
  cardTemplate,
  galleryList,
  editForm,
  addForm,
  avatarForm
};

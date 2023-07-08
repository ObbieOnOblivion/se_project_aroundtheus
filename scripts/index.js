
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

// Elements

const modals = document.querySelectorAll(".modal");
const profile = document.querySelector("#profile");
const profileEditButton = profile.querySelector("#profile__edit_button");
const profileAddButton = profile.querySelector("#profile__add_button");
const profileName = profile.querySelector("#profile__name");
const profileDescription = profile.querySelector("#profile__description");
const profileEditModal = document.querySelector("#profile-modal");
const profileAddModal = document.querySelector("#add-modal");
const profileModalCloseButton = document.querySelector("#profile-modal__close_button");
const placeCloseBtn = document.querySelector("#place-modal__close_button");
const modalInputName = profileEditModal.querySelector("#profile-modal__input_name");
const addModalInputName = document.querySelector("#place-modal__input_name");
const modalInputDescription = profileEditModal.querySelector("#profile-modal__input_description");
const addModalInputDestination = document.querySelector("#place-modal__input_description");
const editForm = document.forms["edit-form"];
const placeModalSaveBtn = document.querySelector("#modal__place-save-button")
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#gallery__list");
const galleryLikeImage = cardTemplate.querySelector("#gallery__like-image");
const pictureModal = document.querySelector("#picture-modal");
const addForm = document.forms["add-form"];
const modalContent = pictureModal.querySelector("#picture-container");
const modalCloseBtn = modalContent.querySelector("#picture-modal__close_button");
const editSaveButton = document.querySelector("#modal__save-button");
const spanName = profileEditModal.querySelector("#profile-modal__input_name-error");
const spanDescription = profileEditModal.querySelector("#profile-modal__input_description-error");
const spanPlace = profileAddModal.querySelector("#place-modal__input_name-error");
const spanUrl = profileAddModal.querySelector("#place-modal__input_description-error");

//functions

placeModalSaveBtn.disabled = true;
placeModalSaveBtn.classList.add("transparent");


function closeByEscape(evt) {

    if (evt.key === "Escape"){
        modals.forEach(modal => {
            closeModal(modal)
        })
    }
  }

function openModal(modal){
    modal.classList.add("modal_open");
    document.addEventListener("keydown", closeByEscape)
}

function closeModal(modal){
    modal.classList.remove("modal_open");
    document.removeEventListener("keydown", closeByEscape)


}

function handleProfileEditSubmit(event){
    event.preventDefault();
    profileName.textContent = modalInputName.value;
    profileDescription.textContent = modalInputDescription.value;
    closeModal(profileEditModal);
};

function handleProfileAddSubmit(event){
    event.preventDefault();
    cardListEl.prepend(getCardElement({name: addModalInputName.value, link: addModalInputDestination.value}));
    addModalInputName.value = "";
    addModalInputDestination.value = "";
    placeModalSaveBtn.disabled = true;
    placeModalSaveBtn.classList.add("transparent");
    closeModal(profileAddModal);
}

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector("#gallery__image");
    const cardTitleEl = cardElement.querySelector("#gallery__text");
    const likeButton = cardElement.querySelector("#gallery__like-button");
    const deleteButton = cardElement.querySelector("#gallery__trash");
    const modalImage = modalContent.querySelector("#picture");
    const modalImageSubHeader = modalContent.querySelector("#picture-modal-description");
    cardTitleEl.textContent = cardData.name; 
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;

    cardImageEl.addEventListener("click", () => {
        openModal(pictureModal);
            modalImage.src = cardImageEl.src;
            modalImage.alt = cardData.name;
            modalImageSubHeader.textContent = cardTitleEl.textContent;

    })

    deleteButton.addEventListener("click", () =>{
        cardElement.remove();
    })

    likeButton.addEventListener("click", () =>{
        likeButton.classList.toggle("gallery__like-button_liked");
    })

    return cardElement;

};

//event listeners

modalCloseBtn.addEventListener("click", () => {
    closeModal(pictureModal);
});


modals.forEach((modal) => {
    modal.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('modal')) {
            closeModal(modal)
        }
    })
})

profileEditButton.addEventListener("click", () => {
    modalInputName.value = profileName.textContent;
    modalInputDescription.value = profileDescription.textContent;
    openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>{
    closeModal(profileEditModal);
})

placeCloseBtn.addEventListener("click", () =>{
    closeModal(profileAddModal);
})

editForm.addEventListener("submit", handleProfileEditSubmit);

addForm.addEventListener("submit", handleProfileAddSubmit);

profileAddButton.addEventListener("click", () =>{
    openModal(profileAddModal);

});

initialCards.forEach((cardData) => {
    const listElement = getCardElement(cardData);
    cardListEl.prepend(listElement);
    
});
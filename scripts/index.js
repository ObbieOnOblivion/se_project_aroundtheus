
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
    }
];

// Elements

const profile = document.querySelector("#profile");
const profileEditButton = profile.querySelector("#profile__edit_button");
const profileAddButton = profile.querySelector("#profile__add_button");
const profileName = profile.querySelector("#profile__name");
const profileDescription = profile.querySelector("#profile__description");
const profileEditModal = document.querySelector("#profile-modal");
const modalCloseButton = document.querySelector("#profile-modal__close_button");
const modalInputName = profileEditModal.querySelector("#profile-modal__input_name");
const modalInputDescription = profileEditModal.querySelector("#profile-modal__input_description");
const modalForm = profileEditModal.querySelector("#profile-modal__form");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#gallery__list")

//functions

function togglepopup(){
    profileEditModal.classList.toggle("modal_open");

};

function handleProfileEditSubmit(event){
    event.preventDefault();
    profileName.textContent = modalInputName.value;
    profileDescription.textContent = modalInputDescription.value;
    togglepopup();
};

function openProfileModal(){
    modalInputName.value = profileName.textContent;
    modalInputDescription.value = profileDescription.textContent;
    togglepopup();
}

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector("#gallery__image")
    const cardTitleEl = cardElement.querySelector("#gallery__text")
    cardTitleEl.textContent = cardData.name; 
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    return cardElement;
};

//event listeners

profileEditButton.addEventListener("click", openProfileModal);
modalCloseButton.addEventListener("click", togglepopup);

modalForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
    const listElement = getCardElement(cardData);
    cardListEl.append(listElement);

});

 
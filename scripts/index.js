
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

const profile = document.querySelector("#profile");
const profileEditButton = profile.querySelector("#profile__edit_button");
const profileAddButton = profile.querySelector("#profile__add_button");
const profileName = profile.querySelector("#profile__name");
const profileDescription = profile.querySelector("#profile__description");
const profileEditModal = document.querySelector("#profile-modal");
const profileAddModal = document.querySelector("#add-modal");
const modalCloseButton = document.querySelector("#profile-modal__close_button");
const placeCloseBtn = document.querySelector("#place-modal__close_button");
const modalInputName = profileEditModal.querySelector("#profile-modal__input_name");
const pictureModalInputName = document.querySelector("#place-modal__input_name");
const modalInputDescription = profileEditModal.querySelector("#profile-modal__input_description");
const pictureModalInputDestination = document.querySelector("#place-modal__input_description");
const modalForm = profileEditModal.querySelector("#profile-modal__form");
const modalSaveBtn = document.querySelector("#modal__save-button");
const pictureModalSaveBtn = document.querySelector("#modal__place-save-button")
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#gallery__list");
const galleryLikeImage = cardTemplate.querySelector("#gallery__like-image");
const pictureModal = document.querySelector("#picture-modal");

//functions

function openModal(modal){
    modal.classList.add("modal_open")
}

function closeModal(modal){
    modal.classList.remove("modal_open")
}

function handleProfileEditSubmit(event){
    event.preventDefault();
    profileName.textContent = modalInputName.value;
    profileDescription.textContent = modalInputDescription.value;
    openModal(profileEditModal);
};

function handleProfileAddSubmit(event){
    event.preventDefault();
    cardListEl.prepend(getCardElement({name: pictureModalInputName.value, link: pictureModalInputDestination.value}));
    closeModal(profileAddModal)
}

function openProfileEditModal(){
    modalInputName.value = profileName.textContent;
    modalInputDescription.value = profileDescription.textContent;
    openModal(profileEditModal);
    modalInputName.placeholder = inputOnePlaceholder;
    modalInputDescription.placeholder = inputTwoPlaceholder;

}

function openCardModal(){
    openModal(profileAddModal)
    pictureModalSaveBtn.addEventListener("click", handleProfileAddSubmit);
}

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector("#gallery__image");
    const cardTitleEl = cardElement.querySelector("#gallery__text");
    const likeButton = cardElement.childNodes[5].childNodes[3];
    const deleteButton = cardElement.childNodes[1];
    const modalContent = pictureModal.childNodes[1];
    const modalImage = modalContent.childNodes[3];
    const modalImageSubHeader = modalContent.childNodes[5];
    const modalCloseBtn = modalContent.childNodes[1];
    cardTitleEl.textContent = cardData.name; 
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;

    cardImageEl.addEventListener("click", () => {
        modalCloseBtn.addEventListener("click", () => {
            closeModal(pictureModal)
        });
        pictureModal.classList.add("modal_open");
            modalImage.src = cardImageEl.src;
            modalImage.alt = `Gallary Image`;
            modalImageSubHeader.textContent = cardTitleEl.textContent;

    })

    deleteButton.addEventListener("click", () =>{
        cardElement.remove();
    })

    likeButton.addEventListener("click", () =>{
        likeButton.classList.toggle("gallery__like-button_liked")
    })

    return cardElement;

};

//event listeners

profileEditButton.addEventListener("click", openProfileEditModal);
modalCloseButton.addEventListener("click", () =>{
    closeModal(profileEditModal);
})

placeCloseBtn.addEventListener("click", () =>{
    closeModal(profileAddModal);
})

modalForm.addEventListener("submit", handleProfileEditSubmit);
modalSaveBtn.addEventListener("click", () =>{
    closeModal(profileEditModal);
})

profileAddButton.addEventListener("click", openCardModal)

initialCards.forEach((cardData) => {
    const listElement = getCardElement(cardData);
    cardListEl.prepend(listElement);
    
});

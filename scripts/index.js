
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
const editForm = document.forms["edit-form"];
const pictureModalSaveBtn = document.querySelector("#modal__place-save-button")
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#gallery__list");
const galleryLikeImage = cardTemplate.querySelector("#gallery__like-image");
const pictureModal = document.querySelector("#picture-modal");
const addForm = document.forms["add-form"];
const modalContent = pictureModal.childNodes[1];
const modalCloseBtn = modalContent.childNodes[1];


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
    closeModal(profileEditModal)
};

function handleProfileAddSubmit(event){
    event.preventDefault();
    cardListEl.prepend(getCardElement({name: pictureModalInputName.value, link: pictureModalInputDestination.value}));
    pictureModalInputName.value = "";
    pictureModalInputDestination.value = "";
    closeModal(profileAddModal)
}

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector("#gallery__image");
    const cardTitleEl = cardElement.querySelector("#gallery__text");
    const likeButton = cardElement.childNodes[5].childNodes[3];
    const deleteButton = cardElement.childNodes[1];
    const modalImage = modalContent.childNodes[3];
    const modalImageSubHeader = modalContent.childNodes[5];
    cardTitleEl.textContent = cardData.name; 
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;

    // question is here 
    console.log(cardElement.closest("#gallery__like-button"));
    console.log(likeButton);
    //end of question
    
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
        likeButton.classList.toggle("gallery__like-button_liked")
    })

    return cardElement;

};

//event listeners

modalCloseBtn.addEventListener("click", () => {
    closeModal(pictureModal)
});

profileEditButton.addEventListener("click", () => {
    modalInputName.value = profileName.textContent;
    modalInputDescription.value = profileDescription.textContent;
    openModal(profileEditModal)
});
modalCloseButton.addEventListener("click", () =>{
    closeModal(profileEditModal);
})

placeCloseBtn.addEventListener("click", () =>{
    closeModal(profileAddModal);
})

editForm.addEventListener("submit", handleProfileEditSubmit);

addForm.addEventListener("submit", handleProfileAddSubmit)

profileAddButton.addEventListener("click", () =>{
    openModal(profileAddModal)
})

initialCards.forEach((cardData) => {
    const listElement = getCardElement(cardData);
    cardListEl.prepend(listElement);
    
});

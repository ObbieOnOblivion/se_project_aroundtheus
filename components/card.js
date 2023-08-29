
class card{
    constructor(name , link, template){
        this._name = name;
        this._link = link;
        this._template = template.cloneNode(true);
        this._list = document.querySelector("#gallery__list");

    }

    _closeByEscape(evt) {  //
        const modals = document.querySelectorAll(".modal");
        if (evt.key === "Escape"){
            modals.forEach(modal => {
                this._closeModal(modal)
            })
        }
      }
    

    _openModal(modal){
        modal.classList.add("modal_open");
        document.addEventListener("keydown", (evt) =>{
            this._closeByEscape(evt)
        })    
    };
    _closeModal(modal){
        // check back with this, it gets called an exorbitant amount of times 
        modal.classList.remove("modal_open");
        document.addEventListener("keydown", (evt) =>{
        })
    };

    _addImageFunctionality(){
        const pictureModal = document.querySelector("#picture-modal");
        const cardElement = this._template;  //this right here make it into a this.xyz value 
        const modalContent = pictureModal.querySelector("#picture-container");
        const cardImageEl = cardElement.querySelector("#gallery__image");
        const cardTitleEl = cardElement.querySelector("#gallery__text");
        const modalImage = modalContent.querySelector("#picture");
        const modalImageSubHeader = modalContent.querySelector("#picture-modal-description");

        cardTitleEl.textContent = this._name; 
        cardImageEl.src = this._link;
        cardImageEl.alt = this._name;

        cardImageEl.addEventListener("click", () => {

            this._openModal(pictureModal)
            modalImage.src = cardImageEl.src;
            modalImage.alt = this._name;
            modalImageSubHeader.textContent = cardTitleEl.textContent;

        })

    }

    _addLikeFunctionality(){
        const likeButton = this._template.querySelector("#gallery__like-button");

        likeButton.addEventListener("click", () =>{
            likeButton.classList.toggle("gallery__like-button_liked");
        })
        
    }

    _addDeleteFunctionality(){

        const deleteButton = this._template.querySelector("#gallery__trash");
        deleteButton.addEventListener("click", () =>{
            const cardElement = deleteButton.closest(".gallery__card");
            if (cardElement) {
                cardElement.remove();
            }
        })

    }
    

    addCard(){

        this._addImageFunctionality()

        this._addLikeFunctionality()
        
        this._addDeleteFunctionality()

        this._list.prepend(this._template);
    }
}

const template = document.querySelector("#card-template").content.firstElementChild

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

initialCards.forEach(item =>{
    const Card = new card(item.name, item.link, template)
    Card.addCard()

});

export {card as modalcard};

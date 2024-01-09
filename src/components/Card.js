class Card {
  constructor(name, link, template, imageClickHandler, apiDelete, toggleButton, apiInfo, id) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._imageClickHandler = imageClickHandler; 
    this._deleteHandler = apiDelete
    this._toggleButton = toggleButton; 
    this._apiInformation = apiInfo;
    this.id = id;
  }

  _addImageFunctionality() {

    this.cardImageEl.addEventListener("click", () => {
      this._imageClickHandler({
        name: this._name,
        link: this._link,
      });
    });
  }

  _addLikeFunctionality() { 
    const likeButton = this._template.querySelector("#gallery__like-button");

    this._apiInformation.forEach(item =>{
      if (item._id == this.id){
        if (item.isLiked){
          likeButton.classList.add("gallery__like-button_liked");
        }
      }
    })
    
    likeButton.addEventListener("click", () => {

      this._toggleButton(this.id, () => {
        likeButton.classList.add("gallery__like-button_liked");
      },
      () =>{
        likeButton.classList.remove("gallery__like-button_liked");
      })
    });
  }

  deleteCard(){
    const closestCard = this._deleteButton.closest(".gallery__card");
        if (closestCard) {
          closestCard.remove();
      }
  }

  _addDeleteFunctionality() {
    
    this._deleteButton = this._template.querySelector("#gallery__trash");
    this._deleteButton.addEventListener("click", () => {
      
      this._deleteHandler(this);

    });
  }

  _setEventListeners() {
    this._addImageFunctionality();

    this._addLikeFunctionality();

    this._addDeleteFunctionality();
  }

  generateCard() {

    this._template = this._template.cloneNode(true);
    this.cardImageEl = this._template.querySelector("#gallery__image");
    this.cardTitleEl = this._template.querySelector("#gallery__text");
    
    this.cardTitleEl.textContent = this._name;
    this.cardImageEl.src = this._link;
    this.cardImageEl.alt = this._name;
    this._setEventListeners();

    return this._template;
  }
}

export default Card;

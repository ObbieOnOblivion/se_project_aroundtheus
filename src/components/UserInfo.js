class UserInfo {
  constructor(nameSelector, aboutMeSelector, avatarImg) {
    this._nameElement = nameSelector;
    this._aboutMeElement = aboutMeSelector;
    this._avatarImg = avatarImg;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutMeElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = about;
  }
  setAvatar(link){
    this._avatarImg.src = link;
  }
}

export { UserInfo };

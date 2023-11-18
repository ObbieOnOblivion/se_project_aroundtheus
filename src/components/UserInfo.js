const profileName = profile.querySelector("#profile__name");
const profileDescription = profile.querySelector("#profile__description");
const profileEditModal = document.querySelector("#profile-modal");

class UserInfo{

    constructor(nameSelector, aboutMeSelector) {
        this._nameElement = nameSelector;
        this._aboutMeElement = aboutMeSelector;
      };
      
      getUserInfo() { 
        return {
          name: this._nameElement.textContent,
          about: this._aboutMeElement.textContent
        };
      };
      
      setUserInfo({ name, about }) {
        console.log(this._nameElement.textContent);
        this._nameElement.textContent = name
        this._aboutMeElement.textContent =  about
      }


    // constructor(){
    //     this._name = "";
    //     this._job = "";
    // };
    // getUserInfo(option_1, option_2){
    //     this._name = profileEditModal.querySelector("#profile-modal__input_name").value;
    //     this._job = profileEditModal.querySelector("#profile-modal__input_description").value;

    //     // this._name = option_1;
    //     // this._name = option_2;

    // };
    // setUserInfo(option_1, option_2){
    //     profileName.textContent = this._name;
    //     profileDescription.textContent = this._job;

    //     // option_1 = this._name;
    //     // option_2 = this._job;

    // };
}

export {UserInfo};
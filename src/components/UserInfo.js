const profileName = profile.querySelector("#profile__name");
const profileDescription = profile.querySelector("#profile__description");
const profileEditModal = document.querySelector("#profile-modal");

class UserInfo{
    constructor(name, job){
        this._name = name;
        this._job = job;
    }
    getUserInfo(){
        this._name = profileEditModal.querySelector("#profile-modal__input_name");
        this._job = profileEditModal.querySelector("#profile-modal__input_description");
    }
    setUserInfo(){
        profileName.textContent = this._name;
        profileDescription.textContent = this._job;
    }
}

export {UserInfo};
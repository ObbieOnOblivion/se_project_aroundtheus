
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
        this._nameElement.textContent = name
        this._aboutMeElement.textContent =  about
      }
}

export {UserInfo};
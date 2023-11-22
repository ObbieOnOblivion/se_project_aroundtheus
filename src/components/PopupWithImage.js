import Popup from "./popup";

class PopupWithImage extends Popup{
    constructor(popupSelector){
        super({popupSelector})
    };

    open(){ //question here 
        super.open({})
    }

};

export {PopupWithImage}
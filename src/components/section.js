import { Card } from "./Card";

class section{
    constructor({items, renderer}, container){
        this._items = items;
        this._container = container;
        this._renderer = renderer;


    }

    _renderItems(){
        let cardList = []
        this._items.forEach(item =>{
            const modelCard = new Card(item.name, item.link, this._renderer);
            cardList.push(modelCard.addCard());
        })
        this._items = cardList;

    }

    addItem(){
        this._renderItems();
        this._items.forEach(item => {
            this._container.prepend(item);

        });
    };
}

export {section}



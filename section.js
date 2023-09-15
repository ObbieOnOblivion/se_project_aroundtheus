import { Card } from "./components/Card";

export default class section{
    constructor(items, renderer, container){
        this._items = items;
        this._renderer = renderer;
        this._container = container;

    }

    _renderItems(){ // change this._items()
        let cardList = []
        items.forEach(item =>{
            const modelCard = new Card(item[0], item[1], template);
            cardList.append(modelCard)
        })
        this._items = cardList;
    }

    addItem(){
        this._renderItems();
        items.array.forEach(item => {
            container.prepend(item)
        });
    };
}




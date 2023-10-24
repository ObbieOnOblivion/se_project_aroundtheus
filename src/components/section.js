
class section{
    constructor({items, renderer}, container){
        this._items = items;
        this._container = container;
        this._renderer = renderer;


    }

    _renderItems(){

        this._items.forEach((item) =>{
            this._renderer(item)
        })

    }

    addItem(){
        this._renderItems();
        this._items.forEach(item => {
            this._container.prepend(item);

        });
    };
}

export {section}



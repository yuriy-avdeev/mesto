export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(dataCardList) {
        dataCardList.forEach(itemWithData => {
            this._renderer(itemWithData); 
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
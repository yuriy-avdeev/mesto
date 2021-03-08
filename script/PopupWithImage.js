import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(link, name, somePopup) {
        super(somePopup);
        this._link = link;
        this._name = name;
        this._somePopup = somePopup;

    }

    open() {
        this._somePopup.classList.add('popup_active')
        this._somePopup.querySelector('.popup-image__big-foto').src = this._link
        this._somePopup.querySelector('.popup-image__caption').textContent =  this._name
        super.setEventListeners()
    }
}


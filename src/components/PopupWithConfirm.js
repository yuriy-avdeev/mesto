import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm =  this._popup.querySelector('.popup__form');
    }

    open(handleConfirm) {
        super.open();
        this._handleConfirm = handleConfirm;
    }

    close() {
        super.close();
        this._popupForm.removeEventListener('submit', this._handleConfirm);
    }
}
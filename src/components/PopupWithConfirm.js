import Popup from './Popup.js';

export default class extends Popup { 
    constructor({popupSelector, handleConfirmDelete}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleConfirmDelete = handleConfirmDelete;
    }

    setEventListeners(id) { 
        super.setEventListeners();
        this._popup.querySelector('.popup__submit-confirm').addEventListener('click', () => {
            this._handleConfirmDelete(id)
        })
    }
}


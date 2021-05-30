import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, buttonConfirmDelete) {
        super(popupSelector);
        this._buttonConfirmDelete = buttonConfirmDelete;
    }

    open(handleConfirm) {
        super.open();
        this._handleConfirm = handleConfirm;
    }

    close() {
        super.close();
        this._buttonConfirmDelete.removeEventListener('click', this._handleConfirm);
    }
}
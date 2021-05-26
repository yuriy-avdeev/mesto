import Popup from './Popup.js';

export default class extends Popup { 
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }
}
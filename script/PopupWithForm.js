import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(handleSubmit, somePopup) {
        super(somePopup);
        this._handleSubmit = handleSubmit;
        this._somePopup = somePopup;
    }

    _getInputValues() {
        return Array.from(this._somePopup.querySelectorAll('.popup__input'))
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._somePopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault()
            const inputsValue = this._getInputValues()
            this._handleSubmit(inputsValue[0].value, inputsValue[1].value)
            this.close()
        })
    }

    close() {
        this._somePopup.classList.remove('popup_active')
        document.removeEventListener('keydown', this.__handleEscClose)
    }
}
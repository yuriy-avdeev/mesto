import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(handleSubmit, somePopup) {
        super(somePopup);
        this._handleSubmit = handleSubmit;
        this._somePopup = somePopup;
    }

    _getInputValues() {
        const inputValues = Array.from(this._somePopup.querySelectorAll('.popup__input'))
        const inputs = inputValues.forEach(function(item) {
            return item.value
        })
        return inputs 

    } 
    
    _handleListener(evt) {
        evt.preventDefault()
        this._getInputValues()


        this._handleSubmit(inputsValue[0].value, inputsValue[1].value)
        this.close()
    }

    setEventListeners() {
        super.setEventListeners();
        this._somePopup.querySelector('.popup__form').addEventListener('submit', this._handleListener)
    }

    close() {
        super.close()
        this._somePopup.querySelector('.popup__form').removeEventListener('submit', this._handleListener)
        this._somePopup.querySelector('.popup__form').reset();
    }
}
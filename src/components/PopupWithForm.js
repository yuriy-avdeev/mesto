import Popup from './Popup.js';

export default class PopupWithForm extends Popup { 
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm =  this._popup.querySelector('.popup__form');
        this._inputsList = this._popup.querySelectorAll('.popup__input');
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
        this._initialText = this._buttonSubmit.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach(input => 
            this._formValues[input.name] = input.value);
        return this._formValues;
    }

    // отрисовка процесса загрузки
    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = this._initialText;
        }
    }

    setEventListeners() { 
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}
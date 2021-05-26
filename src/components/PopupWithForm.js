import Popup from './Popup.js';

export default class extends Popup { 
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(this._popupSelector);
        this._popupForm =  this._popup.querySelector('.popup__form');
        this._inputsList = this._popup.querySelectorAll('.popup__input');
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach(input => 
            this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() { 
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const initialText = this._buttonSubmit.textContent;
            this._handleFormSubmit(this._getInputValues(), this._buttonSubmit, initialText);
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}

// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners - должен добавлять и обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
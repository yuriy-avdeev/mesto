export default class {
    constructor(data, formElement) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonSelector = data.inactiveButtonSelector;
        this._inputErrorSelector = data.inputErrorSelector;
        this._errorMessageSelector = data.errorMessageSelector;
        this._buttonOpenPopupList = data.buttonOpenPopupList;
        this._formElement = formElement;
    }

    enableValidation() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
        this._toggleButtonView(); // добавил сюда, чтобы срабатывал при каждом открытии (не только 1-й раз)

        this._buttonOpenPopupList.forEach(button => {
            button.addEventListener('click', () => {
                this._inputList.forEach(input => {
                    this._hideInputError(input);
                });
                this._toggleButtonView(); // добавил сюда, чтобы срабатывал при каждом открытии (не только 1-й раз)
            })
        })

        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonView();
            });
        });
    }

    _isValid (input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input, input.validationMessage);
        }
    }

    _showInputError(input, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${input.id}-error`); //нашли спан и ниже добавили ему сообщение об ошибке
        this._errorElement.textContent = errorMessage;
        input.classList.add(this._inputErrorSelector); // изменили вид инпута
        this._errorElement.classList.add(this._errorMessageSelector); // активировали спан
    }

    _hideInputError(input) {
        this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
        input.classList.remove( this._inputErrorSelector);
        this._errorElement.classList.remove(this._errorMessageSelector)
        this._errorElement.textContent = '';
    }
    
    _hasInvalidInput() { 
        return this._inputList.some(inputElement => { 
            return !inputElement.validity.valid; 
        }); 
    } 

    _toggleButtonView() { 
        if (this._hasInvalidInput()) { 
            this._buttonElement.classList.add(this._inactiveButtonSelector); 
            this._buttonElement.setAttribute('disabled', true); 
        } else { 
            this._buttonElement.classList.remove(this._inactiveButtonSelector); 
            this._buttonElement.removeAttribute('disabled'); 
        } 
    } 
}
export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._formElement = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonSelector = validationConfig.inactiveButtonSelector;
        this._inputErrorSelector = validationConfig.inputErrorSelector;
        this._errorMessageSelector = validationConfig.errorMessageSelector;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    setInputListener() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonView();
            });
        });
    }

    resetValidation() {
        this._toggleButtonView();
        this._inputList.forEach(input => {
            this._hideInputError(input);
        }); 
    }

    _isValid(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input, input.validationMessage);
        }
    }

    _showInputError(input, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${input.id}-error`); //нашли спан и ниже - ему сообщение об ошибке
        this._errorElement.textContent = errorMessage;
        input.classList.add(this._inputErrorSelector); // изменили вид инпута
        this._errorElement.classList.add(this._errorMessageSelector); // активировали спан
    }

    _hideInputError(input) {
        this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorSelector);
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
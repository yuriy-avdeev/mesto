export default class {
    constructor (data, formElement) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
        this._toggleButtonView(this._inputList, this._buttonElement);

        // слушатель reset - очищение текста ошибок перед открытием формы (openPopup)
        this._formElement.addEventListener('reset', () => {
            this._inputList.forEach(inputElement => {
                this._hideInputError(inputElement)
            });
            this._toggleButtonView();
        });

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonView();
            });
        });
    }

    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._errorElement.textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove( this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass)
        this._errorElement.textContent = '';
    }
    
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonView() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
}
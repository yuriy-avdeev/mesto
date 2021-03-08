export default class {
    constructor (data, formElement) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._buttonOpenPopupList = data.buttonOpenPopupList;
        this._formElement = formElement;
    }

    enableValidation() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
        this._toggleButtonView();

        this._buttonOpenPopupList.forEach(button => {
            button.addEventListener('click', () => {
                this._inputList.forEach(input => {
                    this._hideInputError(input);
                });
                this._toggleButtonView();
            })
        })

        // на reset не работает, т.к. событие reset идет раньше присвоения значениий => 
        // кнопка неактивна (логика ее валидации запускается на пустые поля - имя и профессия)
        // по 2й форме - не разобрался
        
        // this._formElement.addEventListener('reset', () => {
        //     this._inputList.forEach(input => {
        //         this._hideInputError(input);
        //     });
        //     this._toggleButtonView();
        // });

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
        this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
        this._errorElement.textContent = errorMessage;
        input.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError(input) {
        this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
        input.classList.remove( this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass)
        this._errorElement.textContent = '';
    }
    
    _hasInvalidInput() { 
        return this._inputList.some(inputElement => { 
            return !inputElement.validity.valid; 
        }); 
    } 

    _toggleButtonView() { 

        console.log(this._hasInvalidInput())

        if (this._hasInvalidInput()) { 
            this._buttonElement.classList.add(this._inactiveButtonClass); 
            this._buttonElement.setAttribute('disabled', true); 
        } else { 
            this._buttonElement.classList.remove(this._inactiveButtonClass); 
            this._buttonElement.removeAttribute('disabled'); 
        } 
    } 
}
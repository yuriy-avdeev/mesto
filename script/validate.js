const setting = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_state_error',
    errorClass: 'popup__input-error_active',
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

// работа с кнопкой
const toggleButtonView = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(setting.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(setting.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(setting.inputErrorClass);
    errorElement.classList.add(setting.errorClass);
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass)
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

const setEventListener = (formElement) => {
    console.log(setting);

    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);
    toggleButtonView(inputList, buttonElement);

    // слушатель reset - для очищения текста ошибок перед открытием формы (openPopup)
    formElement.addEventListener('reset', () => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement)
        });
        toggleButtonView(inputList, buttonElement);
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonView(inputList, buttonElement);
        });
    });
}

const enableValidation = (setting) => {
    const formList = Array.from(document.querySelectorAll(setting.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            setEventListener(formElement);
        });
    });
}

enableValidation(setting);
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

// работа с кнопкой
const toggleButtonView = (inputList, buttonElement, setting) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(setting.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(setting.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const showInputError = (formElement, inputElement, errorMessage, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(setting.inputErrorClass);
    errorElement.classList.add(setting.errorClass);
}

const hideInputError = (formElement, inputElement, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass)
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement, setting) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, setting);
    } else {
        hideInputError(formElement, inputElement, setting);
    }
}

const setEventListener = (formElement, setting) => {
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);
    toggleButtonView(inputList, buttonElement, setting);

    // слушатель reset - для очищения текста ошибок перед открытием формы (openPopup)
    formElement.addEventListener('reset', () => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, setting)
        });
        toggleButtonView(inputList, buttonElement, setting);
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, setting);
            toggleButtonView(inputList, buttonElement, setting);
        });
    });
}

const enableValidation = (setting = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_state_error',
    errorClass: 'popup__input-error_active',
    buttonClickOpenPopup: ('.profile__click'),
    }) => {
    const buttonOpenPopupList = Array.from(document.querySelectorAll(setting.buttonClickOpenPopup));
    const formList = Array.from(document.querySelectorAll(setting.formSelector));
    buttonOpenPopupList.forEach(buttonOpenPopup => {
        buttonOpenPopup.addEventListener('click', () => {
            formList.forEach(formElement => {
                setEventListener(formElement, setting);
                // if (buttonOpenPopup === buttonPlaceAdd) {
                //     setEventListener(popupFormAddNewPlace);
                // }  else if (buttonOpenPopup === buttonEditProfile) {
                //     setEventListener(formElementAboutUser);
                // }
            });
        });
    });
}

enableValidation();
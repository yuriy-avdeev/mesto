import Card from './Card.js';
import FormValidator from './FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonsClosePopup = Array.from(document.querySelectorAll('.popup__close'));
const formElementAboutUser = document.querySelector('.popup__form-user');
const nameInput = formElementAboutUser.querySelector('.popup__input_type_name');
const jobInput = formElementAboutUser.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
const profile = document.querySelector('.places');
// форма добавления нового места:
const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupFormAddNewPlace = document.querySelector('.popup__form-add');
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');
// template:
const addPlace = document.querySelector('#photo-place').content;

const openPopup = (someOverlay) => {
    someOverlay.classList.add('popup_active')
    document.addEventListener('keydown', closeByEscape)
}

const closePopup = () => {
    const popupActive = document.querySelector('.popup_active');
    popupActive.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEscape);
}

// закроем попап - esc
function closeByEscape (evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}

// закроем попап - крестик
buttonsClosePopup.forEach(button => {
    button.addEventListener('click', (evt) => {
        closePopup();
    });
});

// закроем попап - поле
popupList.forEach(popupItem => {
    popupItem.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup();
        }
    });
});

function takeValue () {
    formElementAboutUser.reset();
    nameInput.value = userName.textContent;
    jobInput.value = userActivity.textContent;
    openPopup(popupProfile);
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userActivity.textContent = jobInput.value;
    closePopup();
}

// открытие попапа новой карточки
buttonPlaceAdd.addEventListener('click', () => {
    popupFormAddNewPlace.reset();
    openPopup(popupAddFoto);
});

// открытие попапа редактора профиля
buttonEditProfile.addEventListener('click', takeValue);

formElementAboutUser.addEventListener('submit', handleFormSubmit);

const initialCards = [
    {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// добавление 6и карточек
initialCards.forEach(item => {
    const firstCards = new Card({
        text: item.name,
        image: item.link,
    }, addPlace, closeByEscape);

    firstCards.generateCard();
    profile.prepend(firstCards.generateCard());
});

// добавление новой карточки
popupFormAddNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const card = new Card({
        image: popupInputUrl.value,
        text: popupInputPlace.value,
        }, addPlace, closeByEscape);

    const cardElement = card.generateCard();
    profile.prepend(cardElement);
    closePopup();
});

// валидация
function validation() {
    const data = {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_inactive',
        inputErrorClass: 'popup__input_state_error',
        errorClass: 'popup__input-error_active',
        buttonClickOpenPopup: '.profile__click',
        }

    const buttonOpenPopupList = Array.from(document.querySelectorAll(data.buttonClickOpenPopup));

    buttonOpenPopupList.forEach(buttonOpenPopup => {
        buttonOpenPopup.addEventListener('click', () => {
            if (buttonOpenPopup === buttonPlaceAdd) { 
                const validFormNewCard = new FormValidator(data, popupFormAddNewPlace)
                validFormNewCard.enableValidation();
            }  else if (buttonOpenPopup === buttonEditProfile) {
                const validFormAboutUser = new FormValidator(data, formElementAboutUser)
                validFormAboutUser.enableValidation();
            }
        });
    });
}

validation();
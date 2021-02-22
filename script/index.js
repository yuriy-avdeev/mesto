import Card from './Card.js';
import FormValidator from './FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonOpenPopupList = Array.from(document.querySelectorAll('.profile__click'));
const buttonClosePopupList = Array.from(document.querySelectorAll('.popup__close'));
const popupFormAboutUser = document.querySelector('.popup__form-user');
const nameInput = popupFormAboutUser.querySelector('.popup__input_type_name');
const jobInput = popupFormAboutUser.querySelector('.popup__input_type_activity');
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
// увеличенная карточка
const popupImage = document.querySelector('.popup-image');
const bigImage = popupImage.querySelector('.popup-image__big-foto');
const bigCaption = popupImage.querySelector('.popup-image__caption');


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
buttonClosePopupList.forEach(button => {
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
    popupFormAboutUser.reset();
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

popupFormAboutUser.addEventListener('submit', handleFormSubmit);

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

// увеличим по фото по клику
const handleCardClick = (link, name)  =>  {
    bigImage.src =link;
    bigCaption.textContent = name;
    openPopup (popupImage);
}

// создание карточки
const createCard = (cardImg, cardCaption) => {
    const card = new Card({
        image: cardImg,
        text: cardCaption,
        }, addPlace, closeByEscape, handleCardClick);

    const cardElement = card.generateCard();
    return cardElement;
}

// добавление 6и карточек
initialCards.forEach(item => {
    const cardElement = createCard(item.link, item.name);
    profile.prepend(cardElement);
});

// добавление новой карточки
popupFormAddNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardElement = createCard(popupInputUrl.value, popupInputPlace.value);
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
    }

    const validFormNewCard = new FormValidator(data, popupFormAddNewPlace);
    const validFormAboutUser = new FormValidator(data, popupFormAboutUser);

    buttonOpenPopupList.forEach(buttonOpenPopup => {
        buttonOpenPopup.addEventListener('click', () => {
            if (buttonOpenPopup === buttonPlaceAdd) { 
                validFormNewCard.enableValidation();
            }  else if (buttonOpenPopup === buttonEditProfile) {
                validFormAboutUser.enableValidation();
            }
        });
    });
}

validation();
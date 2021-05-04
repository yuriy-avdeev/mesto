import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
// import Popup from '../../script/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupProfile = document.querySelector('.profile-popup');
// const popupList = Array.from(document.querySelectorAll('.popup'));
// const cardList = Array.from(document.querySelectorAll('.photo-place'));
// const buttonClosePopupList = Array.from(document.querySelectorAll('.popup__close'));
const popupFormAboutUser = document.querySelector('.popup__form-user');
const nameInput = popupFormAboutUser.querySelector('.popup__input_type_name');
const activityInput = popupFormAboutUser.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
const cardContainer = document.querySelector('.places');
// форма добавления нового места:
const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupFormAddNewPlace = document.querySelector('.popup__form-add');
// const popupInputPlace = document.querySelector('.popup__input_type_place');
// const popupInputUrl = document.querySelector('.popup__input_type_url');
// // template:
const addPlace = document.querySelector('#photo-place').content;
// увеличенная карточка
const popupImage = document.querySelector('.popup-image');
// const bigImage = popupImage.querySelector('.popup-image__big-foto');
// const bigCaption = popupImage.querySelector('.popup-image__caption');
// 6 карточек
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

//слушатель в классе Card
const handleCardClick = (link, name) => {
    const popupImg = new PopupWithImage(link, name, popupImage);
    popupImg.open();
}

// 6 начальных карточек - иниц. Card и их добавление 
const addInitialCard = new Section({
    items: initialCards,
    renderer: (someCardData) => {
        const card = new Card({ image: someCardData.link, text: someCardData.name },
            addPlace, handleCardClick);
        const cardElement = card.generateCard();
        addInitialCard.addItem(cardElement)
    }
}, cardContainer
);
addInitialCard.renderItems();

// отработка сабмита инф. о пользователе
const handleSubmitUserInfo = (name, activity) => {
    const userInfo = new UserInfo(userName, userActivity)
    userInfo.getUserInfo()
    nameInput.value = userInfo.getUserInfo().name
    activityInput.value = userInfo.getUserInfo().activity
    userInfo.setUserInfo(name, activity)
};

// открытие попапа редактора профиля
buttonEditProfile.addEventListener('click', () => {
    const popupForm = new PopupWithForm(handleSubmitUserInfo, popupProfile)
    nameInput.value = userName.textContent;
    activityInput.value = userActivity.textContent;
    popupForm.open()
    popupForm.setEventListeners()
})

// отработка сабмита добавления карточки
const handleSubmitCreateCard = (name, link) => {
    const addNewCard = new Section({
        items: [{ link, name }],
        renderer: (someCardData) => {
            const card = new Card({ image: someCardData.link, text: someCardData.name },
                addPlace, handleCardClick);
            const cardElement = card.generateCard();
            addNewCard.addItem(cardElement)
        }
    }, cardContainer);
    addNewCard.renderItems();
}

buttonPlaceAdd.addEventListener('click', () => {
    const popupCard = new PopupWithForm(handleSubmitCreateCard, popupAddFoto);
    popupCard.open();
    popupCard.setEventListeners();
});

// валидация
function validation() {
    const data = {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_inactive',
        inputErrorClass: 'popup__input_state_error',
        errorClass: 'popup__input-error_active',
        buttonOpenPopupList: Array.from(document.querySelectorAll('.profile__click')),
    }

    const validFormNewCard = new FormValidator(data, popupFormAddNewPlace);
    validFormNewCard.enableValidation();

    const validFormAboutUser = new FormValidator(data, popupFormAboutUser);
    validFormAboutUser.enableValidation();
}
validation();
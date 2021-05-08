import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; // импорт главного файла стилей для сборки проекта (из html ссылка убрана)

// форма редактирования профиля
const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupFormAboutUser = document.querySelector('.popup__form-user');
const nameInput = popupFormAboutUser.querySelector('.popup__input_type_name');
const jobInput = popupFormAboutUser.querySelector('.popup__input_type_activity');
// форма добавления нового места:
const buttonAddNewPlace = document.querySelector('.profile__add-place');
const popupFormAddNewPlace = document.querySelector('.popup__form-add');
// template:
const cardTemplate = document.querySelector('#photo-place').content;
// данные для валидации - передаются при клике открытия попапов
const validationData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonSelector: 'popup__submit_inactive',
    inputErrorSelector: 'popup__input_state_error',
    errorMessageSelector: 'popup__input-error_active',
    buttonOpenPopupList: Array.from(document.querySelectorAll('.profile__click')),
}

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

const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: '.popup-addfoto',
    handleFormSubmit: (formValues) => {
        const card = new Card(
            { image: formValues.url, text: formValues.place },
            cardTemplate,
            {
                handleCardClick() {
                    const popupWithImage = new PopupWithImage('.popup-image');
                    popupWithImage.open(formValues.url, formValues.place);
                }
            }
        );
        const cardElement = card.generateCard();
        document.querySelector('.places').prepend(cardElement);
        popupWithFormAddFoto.close();
    }
});
// ниже отработчик сабмита формы - вызов колбэка (handleFormSubmit: (formValues)) с данными инпутов формы 
// в артрибуте (объект), где атрибут name (html-элемента) - это ключ, value - значение (см. _getInputValues)):
popupWithFormAddFoto.setEventListeners(); 

const userInfo = new UserInfo({ nameUserSelector: '.profile__name', activityUserSelector: '.profile__activity' })

const popupWithFormAboutUser = new PopupWithForm({
    popupSelector: '.profile-popup',
    handleFormSubmit: (formValues) => {
        userInfo.setUserInfo(formValues.name, formValues.activity);
        popupWithFormAboutUser.close();
    }
});
popupWithFormAboutUser.setEventListeners();

// открываем попапы 
document.addEventListener('click', (evt) => {
    if (evt.target === buttonAddNewPlace) {
        const popup = new Popup('.popup-addfoto');
        const validFormNewCard = new FormValidator(validationData, popupFormAddNewPlace);
        validFormNewCard.enableValidation();
        popup.open();
    }
    else if (evt.target === buttonEditProfile) {
        const popup = new Popup('.profile-popup');
        nameInput.value = userInfo.getUserInfo().name;
        jobInput.value = userInfo.getUserInfo().activity;
        const validFormAboutUser = new FormValidator(validationData, popupFormAboutUser);
        validFormAboutUser.enableValidation();
        popup.open();
    }
});

// 6 начальных карточек - инииц. Card и их добавление 
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({ image: item.link, text: item.name },
            cardTemplate,
            {
                handleCardClick () {
                    const popupWithImage = new PopupWithImage('.popup-image');
                    popupWithImage.open(item.link, item.name)
                }
            }
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, '.places');

cardList.renderItems();
import Card from './script/Card.js';
import FormValidator from './script/FormValidator.js';
import Section from './script/Section.js';
import Popup from './script/Popup.js';
import PopupWithImage from './script/PopupWithImage.js';
import PopupWithForm from './script/PopupWithForm.js';
import UserInfo from './script/UserInfo.js';

// import './pages/index.css'; // импорт главного файла стилей для сборки проекта (из html ссылка убрана)

const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonClosePopupList = Array.from(document.querySelectorAll('.popup__close'));
const popupFormAboutUser = document.querySelector('.popup__form-user');
const nameInput = popupFormAboutUser.querySelector('.popup__input_type_name');
const jobInput = popupFormAboutUser.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
// форма добавления нового места:
const buttonAddNewPlace = document.querySelector('.profile__add-place');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupFormAddNewPlace = document.querySelector('.popup__form-add');
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');
// template:
const cardTemplate = document.querySelector('#photo-place').content;
// увеличенная карточка
const popupImage = document.querySelector('.popup-image');
const bigImage = popupImage.querySelector('.popup-image__big-foto');
const bigCaption = popupImage.querySelector('.popup-image__caption');


const userInfo = new UserInfo({nameUserSelector: '.profile__name', activityUserSelector: '.profile__activity'})
console.log(userInfo.getUserInfo())


// const openPopup = (someOverlay) => {
//     someOverlay.classList.add('popup_active')
//     document.addEventListener('keydown', closeByEscape)
// }

// const closePopup = () => {
//     const popupActive = document.querySelector('.popup_active');
//     popupActive.classList.remove('popup_active');
//     document.removeEventListener('keydown', closeByEscape);
// }

// закроем попап - esc
// function closeByEscape (evt) {
//     if (evt.key === 'Escape') {
//         closePopup();
//     }
// }

// закроем попап - крестик
// buttonClosePopupList.forEach(button => {
//     button.addEventListener('click', () => {
//         closePopup();
//     });
// });

// закроем попап - поле
// popupList.forEach(popupItem => {
//     popupItem.addEventListener('click', (evt) => {
//         if (evt.target === evt.currentTarget) {
//             closePopup();
//         }
//     });
// });

// function takeValue () {
//     popupFormAboutUser.reset();
//     nameInput.value = userName.textContent;
//     jobInput.value = userActivity.textContent;
//     openPopup(popupProfile);
// }

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userActivity.textContent = jobInput.value;
    closePopup();
}

// открытие попапа новой карточки
// buttonAddNewPlace.addEventListener('click', () => {
//     popupFormAddNewPlace.reset();
//     openPopup(popupAddFoto);
// });


// открытие попапа редактора профиля
// buttonEditProfile.addEventListener('click', takeValue);

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

// // создание карточки
// const createCard = (cardImg, cardCaption) => {
    
//     return cardElement;
// }

// const handleCardClick = (link, text) => {
//     const popup = new PopupWithImage('.popup-image');
//     popup.open(link, text)
// }

// создание и добавление новой карточки


    // const card = new Card({image: popupInputUrl.value, text: popupInputPlace.value}, 
    //     cardTemplate, 
    //     {handleCardClick() {
    //         const popupWithImage = new PopupWithImage('.popup-image');
    //         popupWithImage.open(popupInputUrl.value, popupInputPlace.value)}
    //     }
    // );

    // const cardElement = card.generateCard();

    // document.querySelector('.places').prepend(cardElement);
    // close();
// });



// данные для валидации - передаются при клике открытия попапов
const validationData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonSelector: 'popup__submit_inactive',
    inputErrorSelector: 'popup__input_state_error',
    errorMessageSelector: 'popup__input-error_active',
    buttonOpenPopupList: Array.from(document.querySelectorAll('.profile__click')),
}


const popupWithForm = new PopupWithForm({
    popupSelector: '.popup-addfoto',
    handleFormSubmit: (formValues) => {

        const card = new Card(
            {image: formValues.url, text: formValues.place},
            cardTemplate,
            {handleCardClick() {
                const popupWithImage = new PopupWithImage('.popup-image');
                popupWithImage.open(formValues.url, formValues.place)}
            }
        );

        const cardElement = card.generateCard();
        document.querySelector('.places').prepend(cardElement);
        // close();
    }
});

popupWithForm.setEventListeners();

// открываем попапы - через родителя 
document.addEventListener('click', (evt) => {
    if (evt.target === buttonAddNewPlace) {
        const popup = new Popup('.popup-addfoto');
        // popupFormAddNewPlace.reset();
        const validFormNewCard = new FormValidator(validationData, popupFormAddNewPlace); 
        validFormNewCard.enableValidation(); 
        popup.open();
        popup.setEventListeners();
    // popupWithForm.close();

    }
    else if (evt.target === buttonEditProfile) {
        const popup = new Popup('.profile-popup');
        // popupFormAboutUser.reset();
        userInfo.getUserInfo()
        // nameInput.value = userName.textContent;
        // jobInput.value = userActivity.textContent;
        const validFormAboutUser = new FormValidator(validationData, popupFormAboutUser); 
        validFormAboutUser.enableValidation(); 
        popup.open();
        popup.setEventListeners();
    }
});

// увеличим по фото по клику
// const handleCardClick = (link, name)  =>  {
//     bigImage.src = link;
//     bigCaption.textContent = name;
//     openPopup (popupImage);
// }


// +++ 6 начальных карточек - инииц. Card и их добавление 
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({ image: item.link, text: item.name },
            cardTemplate,
            {handleCardClick: () => {
                const popupWithImage = new PopupWithImage('.popup-image');
                popupWithImage.open(item.link, item.name)}
            }
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, '.places');

cardList.renderItems();

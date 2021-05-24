const popupAddFotoSelector = '.popup-addfoto';
const popupEditProfileSelector = '.profile-popup';
const popupWithImageSelector = '.popup-image';
const popupWithConfirmSelector = '.popup-delete';
const sectionWithCardSelector = '.places';
const nameUserSelector = '.profile__name';
const activityUserSelector = '.profile__activity'; 
// форма редактирования профиля
const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupFormAboutUser = document.querySelector('.popup__form-user');
const nameInput = popupFormAboutUser.querySelector('.popup__input_type_name');
const jobInput = popupFormAboutUser.querySelector('.popup__input_type_activity');
// форма добавления нового места
const buttonAddNewFoto = document.querySelector('.profile__add-place');
const popupFormAddNewFoto = document.querySelector('.popup__form-add');
// template
const cardTemplate = document.querySelector('#photo-place').content;

const validationConfig = {
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

export {popupAddFotoSelector, popupEditProfileSelector, popupWithImageSelector, sectionWithCardSelector,
    nameUserSelector, activityUserSelector, buttonEditProfile, popupFormAboutUser, nameInput, jobInput, buttonAddNewFoto,
    popupFormAddNewFoto, cardTemplate, validationConfig, initialCards, popupWithConfirmSelector};
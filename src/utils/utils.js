const popupAddFotoSelector = '.popup-addfoto';
const popupEditProfileSelector = '.profile-popup';
const popupWithImageSelector = '.popup-image';
const popupWithConfirmSelector = '.popup-delete';
const popupWithNewAvatarSelector = '.popup-avatar';
const sectionWithCardSelector = '.places';
const nameUserSelector = '.profile__name';
const activityUserSelector = '.profile__activity'; 
const counterLikeSelector = '.photo-place__like-number';
const clickedLikeSelector = '.photo-place__like_click';
const userAvatar = document.querySelector('.profile__photo');
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

const popupAvatarChange = document.querySelector('.popup__form-avatar-change')
const avatarElement = document.querySelector('.profile__avatar-edit');
const popupConfirmDelete = document.querySelector('.popup-delete');
const buttonConfirmDelete = popupConfirmDelete.querySelector('.popup__submit-confirm');

// информация для API
const token = '0077ba4a-e2dd-4b84-9d2b-fc9f32407d03';
const urlFetch = 'https://mesto.nomoreparties.co/v1/cohort-24';

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonSelector: 'popup__submit_inactive',
    inputErrorSelector: 'popup__input_state_error',
    errorMessageSelector: 'popup__input-error_active',
    buttonOpenPopupList: Array.from(document.querySelectorAll('.profile__click')),
}

export {popupAddFotoSelector, popupEditProfileSelector, popupWithImageSelector, sectionWithCardSelector,
    nameUserSelector, activityUserSelector, buttonEditProfile, popupFormAboutUser, nameInput, jobInput, buttonAddNewFoto,
    popupFormAddNewFoto, cardTemplate, validationConfig, popupWithConfirmSelector, counterLikeSelector, avatarElement, 
    popupWithNewAvatarSelector, token, urlFetch, buttonConfirmDelete, popupAvatarChange, clickedLikeSelector, userAvatar};
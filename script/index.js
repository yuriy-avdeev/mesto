let buttonOpenPopup = document.querySelector('.profile__editor-popup');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let buttotSendForm = popup.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_activity');
let userName = document.querySelector('.profile__name');
let userActivity = document.querySelector('.profile__activity');

function popupToggle() {
    popup.classList.toggle('popup_active');
}

function openPopup () {
    nameInput.value = userName.textContent;
    jobInput.value = userActivity.textContent;
    popupToggle();
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userActivity.textContent = jobInput.value;
    popupToggle();
}

buttonOpenPopup.addEventListener('click', openPopup);
closePopup.addEventListener('click', popupToggle);
formElement.addEventListener('submit', handleFormSubmit);


// форма добавления нового места:

const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupAddFotoClose = document.querySelector('.popup-addfoto__close');


function popupAddFotoToggle() {
    popupAddFoto.classList.toggle('popup-addfoto_active');
}

buttonPlaceAdd.addEventListener('click', popupAddFotoToggle);
popupAddFotoClose.addEventListener('click', popupAddFotoToggle);

//добавить новое место - работа с темплейт

const profile = document.querySelector('.places')
const addPlace = document.querySelector('#photo-place').content; // шаблон
const popupFormAdd = document.querySelector('.popup__form-add')
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');


function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const newPlace = addPlace.cloneNode(true);
    newPlace.querySelector('.photo-place__caption').textContent = popupInputPlace.value;
    newPlace.querySelector('.photo-place__image').src = popupInputUrl.value;
    profile.prepend(newPlace);
    popupAddFotoToggle();
    popupInputPlace.value = '';
    popupInputUrl.value = '';
}

popupFormAdd.addEventListener('submit', handleFormAddSubmit);


// работа с кнопкой лайк

const buttonPhotoPlaceLike = document.querySelector('.photo-place__like');

function likeToggle() {
    buttonPhotoPlaceLike.classList.toggle('photo-place__like-click');
}

buttonPhotoPlaceLike.addEventListener('click', likeToggle)


// 6 новых фото - мест

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

const photoPlaceImage = document.querySelectorAll('.photo-place__image'); 
const photoPlaceCaption = document.querySelectorAll('.photo-place__caption'); 

photoPlaceImage[0].src = initialCards[0].link;
photoPlaceImage[1].src = initialCards[1].link;
photoPlaceImage[2].src = initialCards[2].link;
photoPlaceImage[3].src = initialCards[3].link;
photoPlaceImage[4].src = initialCards[4].link;
photoPlaceImage[5].src = initialCards[5].link;

photoPlaceCaption[0].textContent = initialCards[0].name;
photoPlaceCaption[1].textContent = initialCards[1].name;
photoPlaceCaption[2].textContent = initialCards[2].name;
photoPlaceCaption[3].textContent = initialCards[3].name;
photoPlaceCaption[4].textContent = initialCards[4].name;
photoPlaceCaption[5].textContent = initialCards[5].name;



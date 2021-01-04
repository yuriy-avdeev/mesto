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
let openPopup = document.querySelector('.profile__editor-popup');
let overlay = document.querySelector('.overlay');
let closePopup = overlay.querySelector('.popup__close');
let buttotSendForm = overlay.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form_type_name');
let jobInput = formElement.querySelector('.popup__form_type_activity');
let userName = document.querySelector('.profile__name');
let userActivity = document.querySelector('.profile__activity');

nameInput.getAttribute('value'); 
jobInput.getAttribute('value');

function popupToggle() {
    overlay.classList.toggle('overlay_active');
    if (nameInput.value === " " && jobInput.value === " ") {
        nameInput.value = userName.textContent;
        jobInput.value = userActivity.textContent;
    }
}

openPopup.addEventListener('click', popupToggle);
closePopup.addEventListener('click', popupToggle);
buttotSendForm.addEventListener('click', popupToggle);

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    userName.textContent = nameInput.value;
    userActivity.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
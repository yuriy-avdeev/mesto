let openPopup = document.querySelector('.profile__editor-popup');
let overlay = document.querySelector('.overlay');
let closePopup = overlay.querySelector('.popup__close');
let buttotSendForm = overlay.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__form');

function popupToggle() {
    overlay.classList.toggle('overlay_active');
}

openPopup.addEventListener('click', popupToggle);
closePopup.addEventListener('click', popupToggle);
buttotSendForm.addEventListener('click', popupToggle);
// overlay.addEventListener('click', (Event) => {
//     if (Event.target === Event.currentTarget) {
//         popupToggle();
//     }
// });

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    let nameInput = formElement.querySelector('.popup__form_type_name');
    let jobInput = formElement.querySelector('.popup__form_type_activity');

    nameInput.getAttribute('value'); 
    jobInput.getAttribute('value');

    let name = document.querySelector('.profile__name');
    let activity = document.querySelector('.profile__activity');

    name.textContent = nameInput.value;
    activity.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
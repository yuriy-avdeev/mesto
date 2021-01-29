const buttonOpenPopup = document.querySelector('.profile__editor-popup');
const popup = document.querySelector('.popup');
const buttonClosePopup = popup.querySelector('.popup__close');
// const buttotSendForm = popup.querySelector('.popup__submit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
const overlay = document.querySelector('.overlay');
const profile = document.querySelector('.places');
// форма добавления нового места:
const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupFormAdd = document.querySelector('.popup__form-add')
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');
// template:
const addPlace = document.querySelector('#photo-place').content;
const boxPhoto = addPlace.querySelector('.photo-place');


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
buttonClosePopup.addEventListener('click', popupToggle);
formElement.addEventListener('submit', handleFormSubmit);

// 5-я работа:

// 6 новых мест
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

function popupAddFotoVisible() {
    popupAddFoto.classList.toggle('popup_active');
};

function bigPhotoVisible() {
    overlay.classList.toggle('popup_active');
};

buttonPlaceAdd.addEventListener('click', popupAddFotoVisible);
const buttonCloseFormAddFoto = popupAddFoto.querySelector('.popup__close');
buttonCloseFormAddFoto.addEventListener('click', popupAddFotoVisible);
const buttonCloseOverlay = overlay.querySelector('.popup__close');
buttonCloseOverlay.addEventListener('click', bigPhotoVisible);

// работа с карточками
function likeCard (button) {
    button.addEventListener('click', () => {
        button.classList.toggle('photo-place__like_click');
    });
};

function deleteCard (button) {
    button.addEventListener('click', function (evt) {
        evt.target.closest('.photo-place').remove();
    });
};

function makePhotoPlace(newPlace, imageLink, imageName) {
    const foto = newPlace.querySelector('.photo-place__image');
    const caption = newPlace.querySelector('.photo-place__caption'); 
    const buttonLikeCard = newPlace.querySelector('.photo-place__like');
    const buttonDeleteCard = newPlace.querySelector('.photo-place__basket');
    foto.src = imageLink;
    caption.textContent = imageName;

    likeCard(buttonLikeCard);
    deleteCard(buttonDeleteCard);

    foto.addEventListener('click', function() {
        bigPhotoVisible();
        const bigImage = overlay.querySelector('.overlay__big-foto');
        bigImage.src = foto.src;
        const bigCaption = overlay.querySelector('.overlay__caption');
        bigCaption.textContent = caption.textContent;
        overlay.after(overlay);
    });
};

initialCards.forEach(item => {
    const newBoxPhoto = boxPhoto.cloneNode(true);
    const imageLink = item.link;
    const imageName = item.name;
    makePhotoPlace(newBoxPhoto, imageLink, imageName);
    profile.prepend(newBoxPhoto);
});


// template - добавление новой карточки
function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const newBoxPhoto = boxPhoto.cloneNode(true);
    const imageLink = popupInputUrl.value;
    const imageName = popupInputPlace.value;

    makePhotoPlace(newBoxPhoto, imageLink, imageName);

    profile.prepend(newBoxPhoto);
    popupAddFotoVisible();
    popupInputPlace.value = '';
    popupInputUrl.value = '';
};

popupFormAdd.addEventListener('submit', handleFormAddSubmit);
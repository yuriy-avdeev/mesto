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

function popupAddFotoToggle() {
    popupAddFoto.classList.toggle('popup_active');
};

function addNewPlace (placeSrc, sourseSrc, placeName, sourseName) {
    placeSrc.src = sourseSrc;
    placeName.textContent = sourseName;
};

function likeCard (button) {
    button.addEventListener('click', () => {
        button.classList.toggle('photo-place__like_click');
    });
};

function makeBigFoto (img, name) {
    img.addEventListener('click', () => {
        overlay.classList.toggle('popup_active');
        overlay.querySelector('.overlay__big-foto').src = img.src;
        overlay.querySelector('.overlay__caption').textContent = name.textContent;
        overlay.after(overlay);
    });
};

function deleteCard (button) {
    button.addEventListener('click', function (evt) {
        evt.target.closest('.photo-place').remove();
    });
};

function handleCard (foto, linkImage, caption, linkName, buttonLikeCard, buttonDeleteCard) {
    addNewPlace(foto, linkImage, caption, linkName);
    likeCard(buttonLikeCard);
    makeBigFoto (foto, caption);
    deleteCard(buttonDeleteCard);
};

// работа с template - 6 карточек
initialCards.forEach(item => {
    const newBoxPhoto = boxPhoto.cloneNode(true);
    const foto = newBoxPhoto.querySelector('.photo-place__image');
    const caption = newBoxPhoto.querySelector('.photo-place__caption'); 
    const buttonLikeCard = newBoxPhoto.querySelector('.photo-place__like');
    const buttonDeleteCard = newBoxPhoto.querySelector('.photo-place__basket');
    const linkImage = item.link;
    const linkName = item.name;

    handleCard (foto, linkImage, caption, linkName, buttonLikeCard, buttonDeleteCard);

    profile.prepend(newBoxPhoto);
});


// работа с template - добавление новой карточки
function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const newBoxPhoto = boxPhoto.cloneNode(true);
    const foto = newBoxPhoto.querySelector('.photo-place__image');
    const caption = newBoxPhoto.querySelector('.photo-place__caption');
    const buttonLikeCard = newBoxPhoto.querySelector('.photo-place__like');
    const buttonDeleteCard = newBoxPhoto.querySelector('.photo-place__basket');
    const inputImage = popupInputUrl.value;
    const inputName = popupInputPlace.value;

    handleCard (foto, inputImage, caption, inputName, buttonLikeCard, buttonDeleteCard);

    profile.prepend(newBoxPhoto);
    popupAddFotoToggle();
    popupInputPlace.value = '';
    popupInputUrl.value = '';
};

popupFormAdd.addEventListener('submit', handleFormAddSubmit);
buttonPlaceAdd.addEventListener('click', popupToggle);
overlay.querySelector('.overlay__button-close').addEventListener('click', () => {
    overlay.classList.toggle('popup_active');
});
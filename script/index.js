const buttonEditProfile = document.querySelector('.profile__editor-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonsClosePopup = Array.from(document.querySelectorAll('.popup__close'));
const formElementAboutUser = document.querySelector('.popup__form-user');
const nameInput = formElementAboutUser.querySelector('.popup__input_type_name');
const jobInput = formElementAboutUser.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
const profile = document.querySelector('.places');
// форма добавления нового места:
const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupFormAddNewPlace = document.querySelector('.popup__form-add')
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');
// template:
const addPlace = document.querySelector('#photo-place').content;
const boxPhoto = addPlace.querySelector('.photo-place');
// большое фото
const popupImage = document.querySelector('.popup-image');
const bigImage = popupImage.querySelector('.popup-image__big-foto');
const bigCaption = popupImage.querySelector('.popup-image__caption');


// откроем попап
const openPopup = (someOverlay) => {
    someOverlay.classList.add('popup_active');
    document.addEventListener('keydown', closeByEscape);
}

//закроем попап
function closePopup(someOverlay) {
    someOverlay.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEscape);
}

// закроем попап с esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_active')
        closePopup(openedPopup);
    }
}

// закроем попап кликом по крестику
buttonsClosePopup.forEach(button => {
    button.addEventListener('click', (evt) => {
        closePopup(evt.target.closest('.popup'));
    });
});

// закроем попап кликом по полю
popupList.forEach(popupItem => {
    popupItem.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popupItem);
        }
    });
});

function takeValue () {
    formElementAboutUser.reset();
    nameInput.value = userName.textContent;
    jobInput.value = userActivity.textContent;
    setEventListener(popupProfile);
    openPopup(popupProfile);
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userActivity.textContent = jobInput.value;
    closePopup(popupProfile);
}

// открытие попапа новой карточки
buttonPlaceAdd.addEventListener('click', () => {
    popupFormAddNewPlace.reset();
    setEventListener(popupFormAddNewPlace);
    openPopup(popupAddFoto);
});

// открытие попапа редактора профиля
buttonEditProfile.addEventListener('click', takeValue);

formElementAboutUser.addEventListener('submit', handleFormSubmit);

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

const makePhotoPlace = (template, imageLink, imageName) => {
    const newPlace = template.cloneNode(true);
    const foto = newPlace.querySelector('.photo-place__image');
    const caption = newPlace.querySelector('.photo-place__caption'); 
    const buttonLikeCard = newPlace.querySelector('.photo-place__like');
    const buttonDeleteCard = newPlace.querySelector('.photo-place__basket');
    foto.src = imageLink;
    caption.textContent = imageName;

    likeCard(buttonLikeCard);
    deleteCard(buttonDeleteCard);

// попап с увеличенным фото
    foto.addEventListener('click', () => {
        openPopup(popupImage);
        bigImage.src = imageLink;
        bigCaption.textContent = imageName;
    });
    return newPlace;
};

// добавление 6и карточек
initialCards.forEach(item => {
    const imageLink = item.link;
    const imageName = item.name;
    profile.prepend(makePhotoPlace(boxPhoto, imageLink, imageName));
});

// template - добавление новой карточки
function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const imageLink = popupInputUrl.value;
    const imageName = popupInputPlace.value;
    profile.prepend(makePhotoPlace(boxPhoto, imageLink, imageName));

    closePopup(popupAddFoto);
};

popupFormAddNewPlace.addEventListener('submit', handleFormAddSubmit);
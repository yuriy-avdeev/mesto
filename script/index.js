const buttonOpenPopup = document.querySelector('.profile__editor-popup');
const popup = document.querySelector('.popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonsClosePopup = Array.from(document.querySelectorAll('.popup__close'));
const formElementAboutUser = document.querySelector('.popup__form-user');
const nameInput = formElementAboutUser.querySelector('.popup__input_type_name');
const jobInput = formElementAboutUser.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
const overlay = document.querySelector('.overlay');
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

function closePopup(someOverlay) {
    someOverlay.classList.remove('popup_active');
    const formElement = someOverlay.querySelector('.popup__form');
    if (someOverlay.contains(formElement)) {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement);
        });
    }
}

// удаление значений карточки добавления нового места
const deleteValue = (somePopup) => {
    if (somePopup === popupAddFoto) {
        popupFormAddNewPlace.reset();
    }
}

// закроем попап с Esc
const addListenerForEsc = (someOverlay) => {
    function closeWithEsc(evt, someOverlay) {
        if (evt.key === 'Escape') { 
            evt.preventDefault();
            closePopup(someOverlay);
            deleteValue(someOverlay);
            document.removeEventListener('keyup', closeWithEsc);
        }
    }  
    document.addEventListener('keyup', (evt) => closeWithEsc(evt, someOverlay));
}

// откроем попап
const openPopup = (someOverlay) => {
    someOverlay.classList.add('popup_active');
    const formElement = someOverlay.querySelector('.popup__form');
    if (someOverlay.contains(formElement)) {
        setEventListener(someOverlay.querySelector('.popup__form'))
    }
    // enableValidation(); // передать someOverlay как аргумент => enableValidatioт - без перебоpа внутри
    addListenerForEsc(someOverlay);
}

function takeValue () {
    nameInput.value = userName.textContent;
    jobInput.value = userActivity.textContent;
    openPopup(popup);
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userActivity.textContent = jobInput.value;
    closePopup(popup);
}

buttonOpenPopup.addEventListener('click', takeValue);

// закроем попап кликом по крестику
buttonsClosePopup.forEach(button => {
    button.addEventListener('click', (evt) => {
        closePopup(evt.target.closest('.popup'));
        deleteValue(evt.target.closest('.popup'))
    });
});

// закроем попап кликом по полю
popupList.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup)
            deleteValue(popup)
        }
    });
});

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

buttonPlaceAdd.addEventListener('click', () => {
    openPopup(popupAddFoto)
});


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

    foto.addEventListener('click', () => {
        openPopup(overlay);
        const bigImage = overlay.querySelector('.overlay__big-foto');
        bigImage.src = foto.src;
        const bigCaption = overlay.querySelector('.overlay__caption');
        bigCaption.textContent = caption.textContent;
    });
    return newPlace;
};


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
    popupFormAddNewPlace.reset();
};

popupFormAddNewPlace.addEventListener('submit', handleFormAddSubmit);
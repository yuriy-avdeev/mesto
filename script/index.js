const buttonOpenPopup = document.querySelector('.profile__editor-popup');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const buttotSendForm = popup.querySelector('.popup__submit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_activity');
const userName = document.querySelector('.profile__name');
const userActivity = document.querySelector('.profile__activity');
const overlay = document.querySelector('.overlay');
const profile = document.querySelector('.places');


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

function addNewPlace (placeSrc, sourseSrc, placeName, sourseName) {
    placeSrc.src = sourseSrc;
    placeName.textContent = sourseName;
};

const addPlace = document.querySelector('#photo-place').content;
const boxPhoto = addPlace.querySelector('.photo-place');


// работа с template - 6 карточек
initialCards.forEach(item => {
    const newBoxPhoto = boxPhoto.cloneNode(true);
    const addFoto = newBoxPhoto.querySelector('.photo-place__image');
    const addCaption = newBoxPhoto.querySelector('.photo-place__caption'); 
    const buttonLikeCard = newBoxPhoto.querySelectorAll('.photo-place__like');
    const buttonDeleteCard = newBoxPhoto.querySelectorAll('.photo-place__basket');
    const linkImage = item.link;
    const linkName = item.name;

    addNewPlace(addFoto, linkImage, addCaption, linkName);

    profile.prepend(newBoxPhoto);

    // лайк
    buttonLikeCard.forEach(item => { 
        item.addEventListener('click', () => {
            item.classList.toggle('photo-place__like_click')
        });
    });

    // удаление
    buttonDeleteCard.forEach(item => { 
        item.addEventListener('click', () => {
            item.closest('.photo-place').remove()
        });
    });
});


// работа с template - добавление новой карточки
function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const newBoxPhoto = boxPhoto.cloneNode(true);
    const addFoto = newBoxPhoto.querySelector('.photo-place__image');
    const addCaption = newBoxPhoto.querySelector('.photo-place__caption');
    const buttonLikeCard = newBoxPhoto.querySelector('.photo-place__like');
    const buttonDeleteCard = newBoxPhoto.querySelector('.photo-place__basket');
    const inputImage = popupInputUrl.value;
    const inputName = popupInputPlace.value;


    addNewPlace(addFoto, inputImage, addCaption, inputName);

    // удаление новой карточки
    buttonDeleteCard.addEventListener('click', function (evt) {
        evt.target.closest('.photo-place').remove();
    });
    
    // лайк в новой карточке
    buttonLikeCard.addEventListener('click', () => {
        buttonLikeCard.classList.toggle('photo-place__like_click');
    });

    // увеличение новой карточки
    const photoNew = newBoxPhoto.querySelector('.photo-place__image');
    photoNew.addEventListener('click', () => {
        const overlayNew = overlay.cloneNode(true);
        overlayNew.classList.toggle('overlay_active');

        overlayNew.querySelector('.overlay__big-foto').src = addFoto.src;
        overlayNew.querySelector('.overlay__caption').textContent = addCaption.textContent;

        overlay.after(overlayNew);

        overlayNew.querySelector('.overlay__button-close').addEventListener('click', () => {
            overlayNew.classList.toggle('overlay_active');
        });
    });

    profile.prepend(newBoxPhoto);
    popupAddFotoToggle();
    popupInputPlace.value = '';
    popupInputUrl.value = '';
};


// форма добавления нового места:
const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupFormAdd = document.querySelector('.popup__form-add')
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');
const popupAddFotoClose = document.querySelector('.popup-addfoto__close');

popupFormAdd.addEventListener('submit', handleFormAddSubmit);

function popupAddFotoToggle() {
    popupAddFoto.classList.toggle('popup-addfoto_active');
};

buttonPlaceAdd.addEventListener('click', popupAddFotoToggle);
popupAddFotoClose.addEventListener('click', popupAddFotoToggle);


// увеличение фотографии
const listPhoto = document.querySelectorAll('.photo-place__image');

listPhoto.forEach(item => {
    item.addEventListener('click', () => {
        const overlayNew = overlay.cloneNode(true);
        overlayNew.classList.toggle('overlay_active');

        overlayNew.querySelector('.overlay__big-foto').src = item.src;
        overlayNew.querySelector('.overlay__caption').textContent = item.nextElementSibling.textContent;

        overlay.after(overlayNew);

        overlayNew.querySelector('.overlay__button-close').addEventListener('click', () => {
            overlayNew.classList.toggle('overlay_active');
        });
    });
});
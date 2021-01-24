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

const AddPlacesInitial = document.querySelector('.places-initial').content;
const BoxPhotoInitial = AddPlacesInitial.querySelector('.photo-initial');

initialCards.forEach(item => {
    const NewBoxPhotoInitial = BoxPhotoInitial.cloneNode(true);
    NewBoxPhotoInitial.querySelector('.photo-initial__image').src = item.link;
    NewBoxPhotoInitial.querySelector('.photo-initial__caption').textContent = item.name;

    profile.prepend(NewBoxPhotoInitial);
});


// форма добавления нового места:
const buttonPlaceAdd = document.querySelector('.profile__add');
const popupAddFoto = document.querySelector('.popup-addfoto');
const popupAddFotoClose = document.querySelector('.popup-addfoto__close');


function popupAddFotoToggle() {
    popupAddFoto.classList.toggle('popup-addfoto_active');
};

buttonPlaceAdd.addEventListener('click', popupAddFotoToggle);
popupAddFotoClose.addEventListener('click', popupAddFotoToggle);

//добавить новое место - работа с темплейт
const addPlace = document.querySelector('#photo-place').content;
const popupFormAdd = document.querySelector('.popup__form-add')
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');


function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const newPlace = addPlace.cloneNode(true);
    const addCaption = newPlace.querySelector('.photo-place__caption');
    addCaption.textContent = popupInputPlace.value;
    const addFoto = newPlace.querySelector('.photo-place__image');
    addFoto.src = popupInputUrl.value;

    // удаление новой карточки
    newPlace.querySelector('.photo-place__basket').addEventListener('click', function (evt) {
        evt.target.closest('.photo-place').remove();
    });
    
    // лайк в новой карточке
    const addLike = newPlace.querySelector('.photo-place__like');
    addLike.addEventListener('click', () => {
        addLike.classList.toggle('photo-place__like_click');
    });

    // увеличение новой карточки
    newPlace.querySelector('.photo-place__image').addEventListener('click', () => {
        const overlayNew = overlay.cloneNode(true);
        overlayNew.classList.toggle('overlay_active');

        overlayNew.querySelector('.overlay__big-foto').src = addFoto.src;
        overlayNew.querySelector('.overlay__caption').textContent = addCaption.textContent;

        overlay.after(overlayNew);

        overlayNew.querySelector('.overlay__button-close').addEventListener('click', () => {
            overlayNew.classList.toggle('overlay_active');
        });
    });

    profile.prepend(newPlace);
    popupAddFotoToggle();
    popupInputPlace.value = '';
    popupInputUrl.value = '';
};

popupFormAdd.addEventListener('submit', handleFormAddSubmit);


// удаление старой карточки
const buttonDeleteCard = document.querySelectorAll('.photo-initial__basket');

buttonDeleteCard.forEach(item => { 
    item.addEventListener('click', () => {
        item.closest('.photo-place').remove()
    });
});


// лайк в старой карточке
const buttonPhotoPlaceLike = document.querySelectorAll('.photo-initial__like');

buttonPhotoPlaceLike.forEach(item => { 
    item.addEventListener('click', () => {
        item.classList.toggle('photo-initial__like_click')
    });
});


// увеличение фотографии

const ListPhoto = document.querySelectorAll('.photo-place__image');

ListPhoto.forEach(item => {
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

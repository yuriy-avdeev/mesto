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


// 6 новых фото - мест
const initialCards = [
    {
    name: 'Архыз',
    link: './images/Karachaevsk.jpg'
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

let photoPlaceImage = document.querySelectorAll('.photo-place__image'); 
let photoPlaceCaption = document.querySelectorAll('.photo-place__caption'); 

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

photoPlaceCaption[0].alt = initialCards[0].name;


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
const addPlace = document.querySelector('#photo-place').content;
const popupFormAdd = document.querySelector('.popup__form-add')
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputUrl = document.querySelector('.popup__input_type_url');


function handleFormAddSubmit (evt) {
    evt.preventDefault(); 
    const newPlace = addPlace.cloneNode(true);
    newPlace.querySelector('.photo-place__caption').textContent = popupInputPlace.value;
    newPlace.querySelector('.photo-place__image').src = popupInputUrl.value;

    // удаление новой карточки
    newPlace.querySelector('.photo-place__basket').addEventListener('click', function (evt) {
        evt.target.closest('.photo-place').remove();
    });
    
    // лайк в новой карточке
    let addLike = newPlace.querySelector('.photo-place__like');
    addLike.addEventListener('click', () => {
        addLike.classList.toggle('photo-place__like-click');
    });

    profile.prepend(newPlace);
    popupAddFotoToggle();
    popupInputPlace.value = '';
    popupInputUrl.value = '';
}

popupFormAdd.addEventListener('submit', handleFormAddSubmit);


// удаление старой карточки
let buttonDeleteCard = document.querySelectorAll('.photo-place__basket');

buttonDeleteCard.forEach(item => { 
    item.addEventListener('click', () => {
        item.closest('.photo-place').remove()
    }) 
})


// лайк в старой карточке
const buttonPhotoPlaceLike = document.querySelectorAll('.photo-place__like');

buttonPhotoPlaceLike.forEach(item => { 
    item.addEventListener('click', () => {
        item.classList.toggle('photo-place__like-click')
    }) 
})


// увеличение фотографии - сделать оверлей с темплейтом куда добавлять item по клику на него
const overlay = document.querySelector('.overlay');

photoPlaceImage.forEach(item => {
    item.addEventListener('click', () => {
        const overlayNew = overlay.cloneNode(true);
        overlayNew.classList.toggle('overlay_active');

        const overlayBigFoto = overlayNew.querySelector('.overlay__big-foto');
        const overlayCaption = overlayNew.querySelector('.overlay__caption');

        overlayBigFoto.src = item.src
        overlayCaption.textContent = item.nextElementSibling.textContent

        overlay.replaceWith(overlayNew);
    })
})

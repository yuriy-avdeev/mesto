import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// import './index.css'; // импорт главного файла стилей для сборки проекта (из html ссылка убрана)

import {
    popupAddFotoSelector, popupEditProfileSelector, popupWithImageSelector, sectionWithCardSelector,
    nameUserSelector, activityUserSelector, buttonEditProfile, popupFormAboutUser, nameInput, jobInput, buttonAddNewFoto,
    popupFormAddNewFoto, cardTemplate, validationConfig, popupWithConfirmSelector, counterLikeSelector, userAvatar,
    popupWithNewAvatarSelector, token, urlFetch, buttonConfirmDelete, popupAvatarChange, clickedLikeSelector, avatarElement,
} from '../utils/utils.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, activityUserSelector: activityUserSelector });
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddNewFoto);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormAboutUser);
const newAvatarFormValidator = new FormValidator(validationConfig, popupAvatarChange);
const popupWithConfirm = new PopupWithConfirm(popupWithConfirmSelector, buttonConfirmDelete);

const section = new Section({
    renderer: (itemWithData) => {
        const cardElement = createCard(itemWithData);
        section.addItem(cardElement);
    }
}, sectionWithCardSelector);

const api = new Api({
    url: urlFetch,
    headers: {
        authorization: token, 
        'Content-Type': 'application/json'
    }
});

api.getCards()     // загрузка начальных карточек
    .then(dataCardList => {
        section.renderItems(dataCardList)
    });


const createCard = (cardData) => {
    const card = new Card(cardData, cardTemplate,
        {
            handleCardClick() {
                console.log(cardData)
                popupWithImage.open(cardData.link, cardData.name);
            },

            handleBasketClick() {    // обработчик клика по корзине - удаляем карточку (слушатель в Card.js)
                const handleConfirm = () => {
                    api.deleteCard(card._data._id)
                        .then(() => {
                            card._element.remove() 
                            popupWithConfirm.close();
                            // buttonConfirmDelete.removeEventListener('click', handleConfirm);
                        })
                        .catch(err => console.log(err));
                }
                popupWithConfirm.open(handleConfirm);
                popupWithConfirm.setEventListeners();
                buttonConfirmDelete.addEventListener('click', handleConfirm);
            },

            counterLikes() {           // вызов по клику лайка. слушатель в Card.js
                if (cardElement.querySelector(clickedLikeSelector)) {
                    api.likeCard(cardData._id)
                        .then(res => {
                            cardElement.querySelector(counterLikeSelector).textContent = res.likes.length
                        })
                        .catch(err => console.log(err))
                } else {
                    api.likeCardCancel(cardData._id)
                        .then(res => {
                            cardElement.querySelector(counterLikeSelector).textContent = res.likes.length
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

// отрисовка процесса загрузки
function renderLoading(isLoading, buttonSubmit, initialText) {
    if (isLoading) {
        buttonSubmit.textContent = 'Сохранение...'
    } else {
        buttonSubmit.textContent = initialText
    }
}

api.getUser()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        userAvatar.src = res.avatar;
    })
    .catch(err => console.log(err))

const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: popupAddFotoSelector,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        renderLoading(true, buttonSubmit, initialText);
        api.saveNewCard({ name: formValues.name, url: formValues.link })
            .then(cardData => {
                section.renderItems([cardData])
                renderLoading(false, buttonSubmit, initialText)
                popupWithFormAddFoto.close();
            })
            .catch(err => console.log(err))
    }
});

popupWithFormAddFoto.setEventListeners();
// выше отработчик сабмита формы - вызов колбэка (handleFormSubmit: (formValues)) с данными инпутов формы 
// в артрибуте (объект), где атрибут name (html-элемента) - это ключ, value - значение (см. _getInputValues)):

buttonAddNewFoto.addEventListener('click', () => {
    addCardFormValidator.enableValidation();
    popupWithFormAddFoto.open();
})

// попап редактирования профиля:
const popupWithFormAboutUser = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        renderLoading(true, buttonSubmit, initialText);
        // ниже метод отправки POSTом серверу новых данных о пользователе
        api.saveUserInfo({ name: formValues.name, activity: formValues.activity })
            .then(userData => {
                userInfo.setUserInfo(userData.name, userData.about) // в ДОМ добавили имя и работу из ответа сервера
                renderLoading(false, buttonSubmit, initialText)
                popupWithFormAboutUser.close();
            })
            .catch(err => console.log(err))
    }
});

popupWithFormAboutUser.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().activity;
    editProfileFormValidator.enableValidation();
    popupWithFormAboutUser.open();
})

// попап изма аватара:
const popupWithFormNewAvatar = new PopupWithForm({
    popupSelector: popupWithNewAvatarSelector,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        renderLoading(true, buttonSubmit, initialText)
        api.newAvatar(formValues.link)
            .then(res => {
                userAvatar.src = res.avatar;
                renderLoading(false, buttonSubmit, initialText)
                popupWithFormNewAvatar.close()
            })
            .catch(err => console.log(err))
    }
});

popupWithFormNewAvatar.setEventListeners();

avatarElement.addEventListener('click', () => {
    newAvatarFormValidator.enableValidation();
    popupWithFormNewAvatar.open();
})
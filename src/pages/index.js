import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import './index.css'; // импорт главного файла стилей для сборки проекта (из html ссылка убрана)

import {
    popupAddFotoSelector, popupEditProfileSelector, popupWithImageSelector, sectionWithCardSelector,
    nameUserSelector, activityUserSelector, buttonEditProfile, popupFormAboutUser, nameInput, jobInput, buttonAddNewFoto,
    popupFormAddNewFoto, cardTemplate, validationConfig, popupWithConfirmSelector, counterLikeSelector, avatarUserSelector,
    popupWithNewAvatarSelector, token, urlFetch, buttonConfirmDelete, popupAvatarChange, clickedLikeSelector, avatarElement,
} from '../utils/utils.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();
const userInfo = new UserInfo({ 
    nameUserSelector: nameUserSelector, 
    activityUserSelector: activityUserSelector,
    avatarUserSelector: avatarUserSelector
});
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddNewFoto);
addCardFormValidator.setInputListener();
const editProfileFormValidator = new FormValidator(validationConfig, popupFormAboutUser);
editProfileFormValidator.setInputListener();
const newAvatarFormValidator = new FormValidator(validationConfig, popupAvatarChange);
newAvatarFormValidator.setInputListener();
const popupWithConfirm = new PopupWithConfirm(popupWithConfirmSelector, buttonConfirmDelete);
popupWithConfirm.setEventListeners();

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

// let user = null;

Promise.all([api.getUser(), api.getCards()]) 
    .then(([userData, dataCardList]) => {

        userInfo.setUserInfo(userData);
        // user = userData;
        
        // dataCardList = dataCardList.slice(0, 6)
        section.renderItems(dataCardList)
    })
    .catch(err => console.log(err))

// console.log(user)                                           // null - !!!
// const user = userInfo.getUserInfo().id           // ошибка из userInfo

const createCard = (cardData) => {
    // userInfo.getUserInfo().id - работает только как параметр
    const card = new Card(userInfo.getUserInfo().id, cardData, cardTemplate,  
        {
            handleCardClick() {
                popupWithImage.open(cardData.link, cardData.name);
            },

            handleBasketClick() {    // обработчик клика по корзине - удаляем карточку (слушатель в Card.js)
                const handleConfirm = () => {
                    api.deleteCard(card.getCardId())
                        .then(() => {
                            card.removeCard()
                            popupWithConfirm.close();
                        })
                        .catch(err => console.log(err));
                }
                popupWithConfirm.open(handleConfirm);
                buttonConfirmDelete.addEventListener('click', handleConfirm);
            },

            counterLikes() {                                                 // вызов по клику лайка. слушатель в Card.js
                if (cardElement.querySelector(clickedLikeSelector)) {
                    api.likeCard(card.getCardId())                  // ушел запрос с добавлением своего лайка (id - получил из Card)
                        .then(res => {
                            card.updateLikes(res.likes.length)    // передал кол. лайков для отрисовки в ДОМ
                        })
                        .catch(err => console.log(err))
                } else {
                    api.likeCardCancel(card.getCardId())       // ушел запрос с удалением своего лайка
                        .then(res => {
                            card.updateLikes(res.likes.length)    // передал кол. лайков для отрисовки в ДОМ
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: popupAddFotoSelector,
    handleFormSubmit: (formValues) => {
        popupWithFormAddFoto.renderLoading(true);
        api.saveNewCard({ name: formValues.name, url: formValues.link })
            .then(cardData => {
                section.renderItems([cardData]);
                popupWithFormAddFoto.renderLoading(false);
                popupWithFormAddFoto.close();
            })
            .catch(err => console.log(err))
    }
});

popupWithFormAddFoto.setEventListeners();
// выше отработчик сабмита формы - вызов колбэка (handleFormSubmit: (formValues)) с данными инпутов формы 
// в артрибуте (объект), где атрибут name (html-элемента) - это ключ, value - значение (см. _getInputValues)):

buttonAddNewFoto.addEventListener('click', () => {
    addCardFormValidator.resetValidation();
    popupWithFormAddFoto.open();
})

// попап редактирования профиля:
const popupWithFormAboutUser = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (formValues) => {
        popupWithFormAboutUser.renderLoading(true);
        // ниже метод отправки POSTом серверу новых данных о пользователе
        api.saveUserInfo({ name: formValues.name, activity: formValues.activity })
            .then(userData => {
                userInfo.setUserInfo(userData) // в ДОМ добавили имя и работу из ответа сервера
                popupWithFormAboutUser.renderLoading(false);
                popupWithFormAboutUser.close();
            })
            .catch(err => console.log(err))
    }
});

popupWithFormAboutUser.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().activity;
    editProfileFormValidator.resetValidation();
    popupWithFormAboutUser.open();
})

// попап изма аватара:
const popupWithFormNewAvatar = new PopupWithForm({
    popupSelector: popupWithNewAvatarSelector,
    handleFormSubmit: (formValues) => {
        popupWithFormNewAvatar.renderLoading(true)
        api.newAvatar(formValues.link)
            .then(userData => {
                userInfo.setUserInfo(userData);
                popupWithFormNewAvatar.renderLoading(false)
                popupWithFormNewAvatar.close()
            })
            .catch(err => console.log(err))
    }
});

popupWithFormNewAvatar.setEventListeners();

avatarElement.addEventListener('click', () => {
    newAvatarFormValidator.resetValidation();
    popupWithFormNewAvatar.open();
})

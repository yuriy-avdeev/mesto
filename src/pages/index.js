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
    popupFormAddNewFoto, cardTemplate, validationConfig, popupWithConfirmSelector, counterLikeSelector, userAvatar,
    popupWithNewAvatarSelector, token, urlFetch, buttonConfirmDelete, popupAvatarChange, clickedLikeSelector, 
} from '../utils/utils.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, activityUserSelector: activityUserSelector });
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddNewFoto);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormAboutUser);
const newAvatarFormValidator = new FormValidator(validationConfig, popupAvatarChange);
const popupWithConfirm = new PopupWithConfirm(popupWithConfirmSelector);
const api = new Api({
    url: urlFetch,
    headers: {
        authorization: token, 'Content-Type': 'application/json'
    }
});

const createCard = (item) => {
    const card = new Card(item, cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(item.link, item.name);
            },
            handleBasketClick(evt) {  // обр-к клика удаления карточки 
                popupWithConfirm.open();
                buttonConfirmDelete.addEventListener('click', () => {
                    api.deleteCard(item._id) // удалил с сервера
                        .then(() => {
                            popupWithConfirm.close();
                            this.deleteCard(evt); // удалил из DOM
                        })
                        .catch(err => console.log(err));
                })
                popupWithConfirm.setEventListeners();
            },
            counterLikes() {           // вызов по клику лайка. слушатель в Card.js
                if (cardElement.querySelector(clickedLikeSelector)) {
                    api.likeCard(item._id)
                        .then(res => {
                            // console.log(item)  // объект карточки
                            cardElement.querySelector(counterLikeSelector).textContent = res.likes.length
                        })
                        .catch(err => console.log(err))
                } else {
                    api.likeCardCancel(item._id)
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
        // console.log(buttonSubmit.textContent)
    } else {
        buttonSubmit.textContent = initialText
        // console.log(buttonSubmit.textContent)
    }
}

api.getCards()
    .then(res => {
        const newArr = res.slice(0, 6)
        const cardList = new Section({
            arrayWithDataList: newArr,
            renderer: (itemWithData) => {
                const cardElement = createCard(itemWithData);
                cardList.addItem(cardElement);
            }
        }, sectionWithCardSelector);
        cardList.renderItems();
    })
    .catch(err => console.log(err))

api.getUser()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        userAvatar.src = res.avatar;
    })
    .catch(err => console.log(err))

const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: popupAddFotoSelector,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        renderLoading(true, buttonSubmit, initialText)
        const cardAdded = new Section({
            arrayWithDataList: [formValues],
            renderer: (itemWithData) => {
                api.saveNewCard({ name: itemWithData.name, url: itemWithData.link })
                    .then((cardData) => {
                        const cardElement = createCard(cardData);
                        cardAdded.addItem(cardElement);
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        renderLoading(false, buttonSubmit, initialText)
                        popupWithFormAddFoto.close();
                    });
            }
        }, sectionWithCardSelector);
        cardAdded.renderItems();
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

        renderLoading(true, buttonSubmit, initialText)

        // ниже метод отправки POSTом серверу новых данных о пользователе
        api.saveUserInfo({ name: formValues.name, activity: formValues.activity })
            .then(res => {
                userInfo.setUserInfo(res.name, res.about) // в ДОМ добавили имя и работу из ответа сервера
            }) 
            .catch(err => console.log(err))
            .finally(() => {
                renderLoading(false, buttonSubmit, initialText)
                popupWithFormAboutUser.close();
            });
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
            })
            .catch(err => console.log(err))
            .finally(() => {
                renderLoading(false, buttonSubmit, initialText)
                popupWithFormNewAvatar.close()
            });
    }
});

popupWithFormNewAvatar.setEventListeners();

document.querySelector('.profile__avatar-edit').addEventListener('click', () => {
    newAvatarFormValidator.enableValidation();
    popupWithFormNewAvatar.open();
})
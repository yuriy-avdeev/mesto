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
    popupFormAddNewFoto, cardTemplate, validationConfig, initialCards, popupWithConfirmSelector
} from '../utils/utils.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, activityUserSelector: activityUserSelector });
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddNewFoto);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormAboutUser);
const popupWithConfirm = new PopupWithConfirm({popupSelector: popupWithConfirmSelector, handleConfirmDelete: (id) => {
    popupWithConfirm.close();

// Чтобы удалить карточку, отправьте DELETE-запрос:
// DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId 
    

    console.log(id)
    }
});

const createCard = (item) => {
    const card = new Card(item, cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(item.link, item.name);
            },
            handleBasketClick(id) {
                popupWithConfirm.open();
                popupWithConfirm.setEventListeners(id);
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

/////////////////////////////////////////////////////////////////////////////////////////// вниз

const token = '0077ba4a-e2dd-4b84-9d2b-fc9f32407d03';
const url = 'https://mesto.nomoreparties.co/v1/cohort-24';

const api = new Api({
    adress: url,
    token: token
});

api.getCards()
    .then(res => {
        const newArr = res.slice(0, 6)
        const cardList = new Section({
            arrayWithDataList: newArr,
            renderer: (itemWithData) => {
                const cardElement = createCard(itemWithData);
                cardElement.querySelector('.photo-place__like-number').textContent = itemWithData.likes.length
                cardList.addItem(cardElement);
            }
        }, sectionWithCardSelector);
        cardList.renderItems();
    })
    .catch(err => console.log(err))


api.getUser()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about)
        document.querySelector('.profile__photo').src = res.avatar
    })
    .catch(err => console.log(err))



////////////////////////////////////////////////////////////////////////////////////////// вверх


// 6 начальных карточек - инииц. Card и их добавление 
// const cardList = new Section({
//     arrayWithDataList: initialCards,
//     renderer: (itemWithData) => {
//         const cardElement = createCard(itemWithData);
//         cardList.addItem(cardElement);
//     }
// }, sectionWithCardSelector);

// cardList.renderItems();


// попап добавления нового места:
const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: popupAddFotoSelector,
    handleFormSubmit: (formValues) => {

        const cardAdded = new Section({
            arrayWithDataList: [formValues],
            renderer: (itemWithData) => {
                api.saveNewCard({ name: itemWithData.name, url: itemWithData.link })
                    .then((cardData) => {
                        const cardElement = createCard(cardData);
                        console.log(cardAdded)
                        cardAdded.addItem(cardElement);
                    })
                    .catch(err => console.log(err))
            }
        },

            sectionWithCardSelector);
        cardAdded.renderItems();
        popupWithFormAddFoto.close();
    }
});

popupWithFormAddFoto.setEventListeners();
// выше отработчик сабмита формы - вызов колбэка (handleFormSubmit: (formValues)) с данными инпутов формы 
// в артрибуте (объект), где атрибут name (html-элемента) - это ключ, value - значение (см. _getInputValues)):

buttonAddNewFoto.addEventListener('click', () => {
    popupWithFormAddFoto.open();
})

addCardFormValidator.enableValidation();

// попап редактирования профиля:
const popupWithFormAboutUser = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (formValues) => {
        userInfo.setUserInfo(formValues.name, formValues.activity);
        // ниже метод отправки POSTом серверу новых данных о пользователе
        api.saveUserInfo({ name: formValues.name, activity: formValues.activity })
        // .catch(err => console.log(err))

        popupWithFormAboutUser.close();
    }
});

popupWithFormAboutUser.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().activity;
    popupWithFormAboutUser.open();
})

editProfileFormValidator.enableValidation();
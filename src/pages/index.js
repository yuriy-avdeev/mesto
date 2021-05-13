import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import './index.css'; // импорт главного файла стилей для сборки проекта (из html ссылка убрана)

import {
    popupAddFotoSelector, popupEditProfileSelector, popupWithImageSelector, sectionWithCardSelector,
    nameUserSelector, activityUserSelector, buttonEditProfile, popupFormAboutUser, nameInput, jobInput, buttonAddNewFoto,
    popupFormAddNewFoto, cardTemplate, validationConfig, initialCards
} from '../utils/utils.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, activityUserSelector: activityUserSelector });
const addCardFormValidator = new FormValidator(validationConfig, popupFormAddNewFoto);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormAboutUser);


const createCard = (item) => {
    const card = new Card({ image: item.link, text: item.name },
        cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(item.link, item.name);
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}


// 6 начальных карточек - инииц. Card и их добавление 
const cardList = new Section({
    arrayWithDataList: initialCards,
    renderer: (itemWithData) => {
        const cardElement = createCard(itemWithData);
        cardList.addItem(cardElement);
    }
}, sectionWithCardSelector);

cardList.renderItems();


// попап добавления нового места:
const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: popupAddFotoSelector,
    handleFormSubmit: (formValues) => {
        const cardAdded = new Section({
            arrayWithDataList: [formValues],
            renderer: (itemWithData) => {
                const cardElement = createCard(itemWithData);
                cardAdded.addItem(cardElement);
            }
        }, sectionWithCardSelector);
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
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// import './index.css'; // импорт главного файла стилей для сборки проекта (из html ссылка убрана)

import {popupAddFotoSelector, popupEditProfileSelector, popupWithImageSelector, sectionWithCardSelector,
    nameUserSelector, activityUserSelector, buttonEditProfile, popupFormAboutUser, nameInput, jobInput, buttonAddNewFoto,
    popupFormAddNewFoto, cardTemplate, valiadationConfig, initialCards} from '../utils/utils.js';


const popupWithImage = new PopupWithImage(popupWithImageSelector);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, activityUserSelector: activityUserSelector })


// попап добавления нового места:
const popupWithFormAddFoto = new PopupWithForm({
    popupSelector: popupAddFotoSelector,
    handleFormSubmit: (formValues) => {
        const card = new Card(
            { image: formValues.url, text: formValues.place },
            cardTemplate,
            {
                handleCardClick() {
                    popupWithImage.open(formValues.url, formValues.place);
                }
            }
        );
        const cardElement = card.generateCard();
        document.querySelector(sectionWithCardSelector).prepend(cardElement);
        popupWithFormAddFoto.close();
    }
});

// ниже отработчик сабмита формы - вызов колбэка (handleFormSubmit: (formValues)) с данными инпутов формы 
// в артрибуте (объект), где атрибут name (html-элемента) - это ключ, value - значение (см. _getInputValues)):
popupWithFormAddFoto.setEventListeners(); 

buttonAddNewFoto.addEventListener('click', () => {
    const validFormAddFoto = new FormValidator(valiadationConfig, popupFormAddNewFoto);
    validFormAddFoto.enableValidation();
    popupWithFormAddFoto.open();
})


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
    const validFormAboutUser = new FormValidator(valiadationConfig, popupFormAboutUser);
    validFormAboutUser.enableValidation();
    popupWithFormAboutUser.open();
})


// 6 начальных карточек - инииц. Card и их добавление 
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({ image: item.link, text: item.name },
            cardTemplate,
            {
                handleCardClick () {
                    popupWithImage.open(item.link, item.name)
                }
            }
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, sectionWithCardSelector);

cardList.renderItems();
export default class {
    constructor(data, cardTemplate, {handleCardClick}) {
        this._text = data.text;
        this._image = data.image;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.querySelector('.photo-place').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.photo-place__image').src = this._image;
        this._element.querySelector('.photo-place__caption').textContent = this._text;
        return this._element;
    }

    // слушатели
    _setEventListeners() {
        this._element.querySelector('.photo-place__image').addEventListener('click', () => {
            this._handleCardClick();
        });
        this._element.querySelector('.photo-place__like').addEventListener('click', () => {
            this._likeCard(this._element.querySelector('.photo-place__like'));
        });
        this._element.querySelector('.photo-place__basket').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
    }

    // методы-обработчики
    _likeCard = (button) => {
        button.classList.toggle('photo-place__like_click');
    }

    _deleteCard = (evt) => {
        evt.target.closest('.photo-place').remove();
    }
}
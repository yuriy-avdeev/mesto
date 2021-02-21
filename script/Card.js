export default class {
    constructor(data, cardSelector, closeByEscape) {
        this._text = data.text;
        this._image = data.image;
        this._cardSelector = cardSelector;
        this._closeByEscape = closeByEscape;
    }

    _getTemplate() {
        const cardElement = this._cardSelector.querySelector('.photo-place').cloneNode(true);
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
            this._hanleClickFoto();
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

    _hanleClickFoto() {
        document.querySelector('.popup-image').classList.toggle('popup_active');
        document.querySelector('.popup-image__big-foto').src = this._image;
        document.querySelector('.popup-image__caption').textContent = this._text;
        document.addEventListener('keydown', this._closeByEscape);
    }
}
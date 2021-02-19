export default class {
    constructor(data, cardSelector) {
        this._text = data.text;
        this._image = data.image;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.photo-place')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.photo-place__image').src = this._image;
        this._element.querySelector('.photo-place__caption').textContent = this._text;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.photo-place__image').addEventListener('click', () => {
            this._hanleClickFoto();
        });
        
        // удалить слушатель!!!!!!!
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                document.querySelector('.popup_active').classList.remove('popup_active');
            }
        });
    }

    _hanleClickFoto() {
        document.querySelector('.popup-image').classList.add('popup_active');
        document.querySelector('.popup-image__big-foto').src = this._image;
        document.querySelector('.popup-image__caption').textContent = this._text;
    }
}
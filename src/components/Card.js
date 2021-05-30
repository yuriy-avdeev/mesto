export default class Card {
    constructor(userID, data, cardTemplate, { handleCardClick, handleBasketClick, counterLikes }) {
        this._userID= userID;
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._newCardSelector = '.photo-place';
        this._placeLikeSelector = 'photo-place__like';
        this._newCardElement = this._cardTemplate.querySelector(this._newCardSelector);
        this._handleCardClick = handleCardClick;
        this._handleBasketClick = handleBasketClick; // должен открыть попап с вопросом об удалении
        this._counterLikes = counterLikes;
        this._element = this._getTemplate();
        this._placeWithImage = this._element.querySelector('.photo-place__image');
        this._placeWithCaption = this._element.querySelector('.photo-place__caption');
        this._placeLikeSymbol = this._element.querySelector('.photo-place__like');
        this._counterLikeElement = this._element.querySelector('.photo-place__like-number');
        this._placeBasketSymbol = this._element.querySelector('.photo-place__basket'); 
    }

    _getTemplate() {
        if (this._data.owner._id !== this._userID) {
            const cardElement = this._newCardElement.cloneNode(true);
            cardElement.querySelector('.photo-place__basket').remove(); 
            return cardElement
        } else {
            const cardElement = this._newCardElement.cloneNode(true);
            return cardElement
        }
    }

    generateCard() {
        this._setEventListeners();
        this._placeWithImage.src = this._data.link;
        this._placeWithCaption.textContent = this._data.name;
        this._counterLikeElement.textContent = this._data.likes.length
        this._placeWithImage.alt = 'загруженное изображение';
        this._data.likes.forEach(user => {
            if(user._id == this._userID) {
                this._placeLikeSymbol.classList.add(`${this._placeLikeSelector}_click`)
            }
        });
        return this._element;
    }

    _setEventListeners() {
        this._placeWithImage.addEventListener('click', () => {
            this._handleCardClick();
        });
        this._placeLikeSymbol.addEventListener('click', () => {
            this._likeCard(this._placeLikeSymbol);
        });

        if (this._placeBasketSymbol) {
            this._placeBasketSymbol.addEventListener('click', () => {
                this._handleBasketClick();
            })
        }
    }

    _likeCard = (button) => {
        button.classList.toggle(`${this._placeLikeSelector}_click`);
        this._counterLikes();
    }

    updateLikes(likesNumber) {
        this._counterLikeElement.textContent = likesNumber;
    }

    getCardId() {
        return this._data._id 
    }

    removeCard() {
        this._element.remove()
    }
}
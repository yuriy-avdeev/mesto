export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupActiveSelector = 'popup_active';
        this._buttonClosePopup = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add(this._popupActiveSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupActiveSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();         
        }
    }

    setEventListeners() { 
        this._buttonClosePopup.addEventListener('click', () => { 
            this.close();         
        }) 

        this._popup.addEventListener('click', (evt) => { 
            if (evt.target === evt.currentTarget) { 
                this.close();         
            } 
        }) 
    } 
} 

// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
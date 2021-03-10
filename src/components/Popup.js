export default class Popup {
    constructor(somePopup) {
        this._somePopup = somePopup
    }

    open() {
        this._somePopup.classList.add('popup_active')
        // this.setEventListeners()
    }

    close() {
        this._somePopup.classList.remove('popup_active')
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
        this.close()
        }
    }
    
    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose)

        this._somePopup.querySelector('.popup__close').addEventListener('click', () => {
            this.close()
        })

        this._somePopup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close()
            }
        })
    }
}
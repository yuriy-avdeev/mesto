import Popup from './Popup.js';

export default class extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigFoto = this._popup.querySelector('.popup-image__big-foto');
        this._bigCaption = this._popup.querySelector('.popup-image__caption');
        
        
    }

    open(link, name) {
        super.open()
        this._bigFoto.src = link;
        this._bigCaption.textContent =  name;
        this._bigFoto.alt = 'увеличенное выбранное изображение';
        super.setEventListeners();
    }
}
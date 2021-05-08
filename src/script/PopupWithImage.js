import Popup from './Popup.js';

export default class extends Popup { 
    open(link, name) {
        super.open()
        this._popup.querySelector('.popup-image__big-foto').src = link;
        this._popup.querySelector('.popup-image__caption').textContent =  name;
        super.setEventListeners();
    }
}
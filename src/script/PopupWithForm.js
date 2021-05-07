import Popup from './Popup.js';

export default class extends Popup { 
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector)
    }

    _getInputValues() {

    }

    setEventListeners() { 
        super.setEventListeners()
        
    }

    close() {
        super.close()
        
    }
}

// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners - должен добавлять и обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
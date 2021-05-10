export default class { // в конструктор - объект с селекторами двух html-элементов: имени пользователя и информации о себе
    constructor({nameUserSelector, activityUserSelector}) { 
        this._name = document.querySelector(nameUserSelector);
        this._activity = document.querySelector(activityUserSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.activity = this._activity.textContent;
        return userInfo  //данные пользователя - подставить в форму при открытии
    }

    // принимает новые данные пользователя и добавляет их на страницу в ф.-колбэке
    setUserInfo(userNameInInput, userActivityInInput) {
        this._name.textContent = userNameInInput;
        this._activity.textContent = userActivityInInput;
    }
}
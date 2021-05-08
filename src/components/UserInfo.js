export default class {
    constructor({nameUserSelector, activityUserSelector}) {
        this._nameUserSelector = nameUserSelector;
        this._activityUserSelector = activityUserSelector;
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = document.querySelector(this._nameUserSelector).textContent;
        userInfo.activity = document.querySelector(this._activityUserSelector).textContent;
        return userInfo  //данные пользователя - подставить в форму при открытии
    }

    // принимает новые данные пользователя и добавляет их на страницу в ф.-колбэке
    setUserInfo(userNameInInput, userActivityInInput) {
        document.querySelector(this._nameUserSelector).textContent = userNameInInput;
        document.querySelector(this._activityUserSelector).textContent = userActivityInInput;
    }
}


// в конструктор - объект с селекторами двух html-элементов: имени пользователя и информации о себе.
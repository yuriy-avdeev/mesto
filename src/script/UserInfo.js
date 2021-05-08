export default class {
    constructor({nameUserSelector, activityUserSelector}) {
        this._userName = document.querySelector(nameUserSelector).textContent;
        this._userActivity = document.querySelector(activityUserSelector).textContent;
    }

    getUserInfo() {
        const userInfo = {}   // уточнить порядок вызова данных - м.б. после присвоения
        userInfo.name = this._userName;
        userInfo.activity = this._userActivity;
        return userInfo
    }

    setUserInfo(userNameInInput, userActivityInInput) { // по сабмиту?
        this._userName = userNameInInput;
        this._userActivity = userActivityInInput;
    }
}

//  публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
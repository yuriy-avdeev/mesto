export default class UserInfo {
    constructor({nameUserSelector, activityUserSelector, avatarUserSelector}) { 
        this._name = document.querySelector(nameUserSelector);
        this._activity = document.querySelector(activityUserSelector);
        this._avatar = document.querySelector(avatarUserSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.activity = this._activity.textContent;
        userInfo.avatar = this._userData.avatar;
        userInfo.id = this._userData._id;
        // console.log(userInfo)
        return userInfo 
    }

    // принимает новые данные пользователя и добавляет их на страницу в ф.-колбэке
    setUserInfo(userData) {
        this._userData = userData;
        this._name.textContent = this._userData.name;
        this._activity.textContent = this._userData.about;
        this._avatar.src = this._userData.avatar;
    }
}
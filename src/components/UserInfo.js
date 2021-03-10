export default class UserInfo {
    constructor(selectorName, selectorActivity) {
        this._selectorName = selectorName
        this._selectorActivity = selectorActivity
    }

    getUserInfo() {
        const name = this._selectorName.textContent
        const activity = this._selectorActivity.textContent
        const userData = {name, activity}
        return userData
    }

    setUserInfo(name, activity) {
        this._selectorName.textContent = name;
        this._selectorActivity.textContent = activity;
    }
}
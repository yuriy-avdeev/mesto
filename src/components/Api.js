export default class {
    constructor({ adress, token }) {
        this._adress = adress;
        this._token = token;
    }

    getCards() {
        return fetch(`${this._adress}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.statusText}`)
        })
    }

    getUser() {
        return fetch(`${this._adress}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                // console.log(res)
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.statusText}`)
        })
    }

    saveUserInfo({ name, activity }) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: activity
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    saveNewCard({name, url}) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: url
            })
        })
            .then(res => {
                if (res.ok) {
                    console.log(res)
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }
}
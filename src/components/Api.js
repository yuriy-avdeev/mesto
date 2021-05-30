export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
        }
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }


    likeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }


    likeCardCancel(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    saveUserInfo({ name, activity }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: activity
            })
        })
        .then(this._checkResponse)
    }

    saveNewCard({ name, url }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: url
            })
        })
        .then(this._checkResponse)
    }

    newAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            })
        })
            .then(this._checkResponse)
    }
}
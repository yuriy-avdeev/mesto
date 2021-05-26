export default class {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка загрузки карточки: ${res.statusText}`)
            })
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    // console.log('карточка удалена')
                    return res.json()
                }
                return Promise.reject(`Ошибка удаления карточки: ${res.statusText}`)
            })
    }


    likeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    // console.log('лайк')
                    return res.json()
                }
                return Promise.reject(`Ошибка клика лайк: ${res.statusText}`)
            })
    }


    likeCardCancel(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    // console.log('лайк удален')
                    return res.json()
                }
                return Promise.reject(`Ошибка клика снятия лайк: ${res.statusText}`)
            })
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка загрузки данных пользователя: ${res.statusText}`)
            })
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
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка сохранения данных пользователя: ${res.status}`)
                }
            })
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
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка добавления новой карточки: ${res.status}`)
                }
            })
    }

    newAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка добавления нового аватара пользователя: ${res.status}`)
                }
            })
    }
}
export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
        // после запроса (fetch) получили спец. объект ответа (res) и если промис выполнен успешно (res.ok ?), то >
        // выполним метод объекта ответа (res.json()), чтобы получить данные,  - возвр-т промис => 
        // далее (тут в index.js) снова вызываем .then и обрабатываем в колбеке

    }

    async getUser() {
        const res = await fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        return this._checkResponse(res);
        // код останавливает выполн-е на ключ. слове await (до выполн. обещания) и продолжает 
        // выполнение далее - async/await позволяет писать асинхронный код синхронно, не блокируя стек вызовов. 
        // мы замораживаем код и ждем пока выполнится промис, а затем продолжаем. 
        // асинхронн. функция позволяет “вытащить” значение завершенного промиса без метода (then).
    }

    async likeCard(id) {
        const res = await fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        });
        return this._checkResponse(res);
    }

// дальше - через then
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
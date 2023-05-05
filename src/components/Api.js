export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = this._headers.authorization;
    this._contentType = this._headers['Content-Type'];
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`);
    })
    .catch(err => {
      alert(err);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`);
    })
    .catch(err => {
      alert(err);
    });
  }
}

// baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',

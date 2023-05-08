export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = this._headers.authorization;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}.`
          );
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Что-то пошло не так! Ошибка: ${res.status} ${res.statusText}`
        );
      })
      .catch((err) => {
        alert(err);
      });
  }
}

// baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',

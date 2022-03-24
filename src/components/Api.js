export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _checkResponse = (response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._checkResponse)
  }

  setAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(this._checkResponse)
  }

  addCard({location, link}, id) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: location,
        link: link,
        _id: id
      })
    }).then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    }).then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    }).then(this._checkResponse)
  }
}

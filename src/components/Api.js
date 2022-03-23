export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
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
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
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
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
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
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }

  updateLikeCard({ cardId, isLiked }) {
    return isLiked ? this._deleteLike(cardId) : this._addLike(cardId);
  }

  addLike(cardid) {
    return fetch(`${this._adress}/cards/${cardid}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }

  deleteLike(cardid) {
    return fetch(`${this._adress}/cards/${cardid}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }
}

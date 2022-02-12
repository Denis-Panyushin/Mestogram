export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _handleResponse = (response) => {
    response.ok
        ? response.json()
        : Promise.reject(`Ошибка ${response.status}`)
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
    fetch(`${this._address}/users/me`, {
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

  addCard(data) {
    fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse)
  }

  editAvatar(data) {
    fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(response => {
      if (response.ok) {
          return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }
}

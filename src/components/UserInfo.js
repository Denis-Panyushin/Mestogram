export default class UserInfo {
  constructor({ data }) {
    this._userName = data.name;
    this._userJob = data.about;
    this._avatar = data.avatar;
    this._userId = data._id;
    this._nameSelector = document.querySelector('.profile-info__name');
    this._infoSelector = document.querySelector('.profile-info__description');
    this._avatarSelector = document.querySelector('.profile__avatar');
  }

  getId() {
    return this._userId;
  }

  getUserInfo() {
    this._nameSelector.textContent = this._userName;
    this._infoSelector.textContent = this._userJob;
    this._avatarSelector.style.backgroundImage = `url('${this._avatar}')`;
  }

  setUserInfo({ name, about }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = about;
  }

  setAvatar({ avatar }) {
    this._avatarSelector.src = avatar;
  }
}

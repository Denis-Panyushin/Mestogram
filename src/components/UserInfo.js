export default class UserInfo {
  constructor({ data }) {
    this._userName = data.name;
    this._userJob = data.about;
    this._nameSelector = document.querySelector('.profile-info__name');
    this._infoSelector = document.querySelector('.profile-info__description');
  }

  getUserInfo() {
    this.userData = {
    userName: this._userName,
    userJob: this._userJob
    };
    console.log(this.userData)
    return this.userData;
  }

  setUserInfo({ name, description }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = description;
  }
}

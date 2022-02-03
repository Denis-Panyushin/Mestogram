export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
    this._nameSelector = document.querySelector('.profile-info__name');
    this._infoSelector = document.querySelector('.profile-info__description');
  }

  getUserInfo() {
    this.userData = {
    userName: this._userName.textContent,
    userJob: this._userJob.textContent
    };
    console.log(this.userData)
    return this.userData;
  }

  setUserInfo({ name, description }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = description;
  }
}

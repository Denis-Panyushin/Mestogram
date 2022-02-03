import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = document.querySelector('.popup__pic'); //Картинка карточки для попапа с изображением
    this._popupDescription = document.querySelector('.popup__description'); //Название места изображения
    this._closePopupBtn = this._popup.querySelector('.popup__escape');
    this._overlayPopup = this._popup.querySelector('.popup__container');
  }

  open(data) {
    this._popupDescription.textContent = data.name;
    this._popupPicture.setAttribute('src', data.link);
    this._popupPicture.setAttribute('alt', data.name);
    super.open();
  }
}

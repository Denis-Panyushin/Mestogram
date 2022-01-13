import { openPopup } from "./script.js";

export default class Card {
  constructor (data, elSelector) {
    this._link = data.link;//Ссылка на картинку
    this._name = data.name;//Имя картинки
    this._elSelector = elSelector;//Селектор карточки
    this._imagePopup = document.querySelector('.popup_type_image'); //Попап изображения
    this._popupPicture = this._imagePopup.querySelector('.popup__pic'); //Картинка карточки для попапа с изображением
    this._popupDescription = this._imagePopup.querySelector('.popup__description'); //Название места изображения
  }

  //Находим в ДОМ и клонируем
  _getTempalte () {
    const el = document
    .querySelector(this._elSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return el;
  }

  //Генерация элемента
  generateEl() {
    this._element = this._getTempalte();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__description').textContent = this._name;

    return this._element;
  }

  //Функция лайка
  _likeEl() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  //Функция удаления
  _deleteEl() {
    this._element.remove();
  }

  //Открытие попапа карточки
  _handleOpenPopup() {
    this._popupDescription.textContent = this._name;
    this._popupPicture.setAttribute('src', this._link);
    this._element.querySelector('.element__image').setAttribute('alt', this._name);
    openPopup(this._imagePopup);
  }

  //Слушатель для всех событий на карточке
  _setEventListeners() {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteEl();
    })

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeEl();
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })
  }
}

export default class Card {
  constructor (data, elSelector, { handleCardClick }) {
    this._link = data.link;//Ссылка на картинку
    this._name = data.name;//Имя картинки
    this._elSelector = elSelector;//Селектор карточки
    this._handleCardClick = handleCardClick;
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
    this._handleCardClick();
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

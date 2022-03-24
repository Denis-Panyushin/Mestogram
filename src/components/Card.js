export default class Card {
  constructor (data, elSelector, userId, { handleCardClick, handleLike, handleDelete }) {
    this._link = data.link;//Ссылка на картинку
    this._name = data.name;//Имя картинки
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardId = data._id;
    this._elSelector = elSelector;//Селектор карточки
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._likeCount = document.querySelector('.element__likes')
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
    this._likeCount.textContent = this._likes.length;
    this.isLiked();
    this._removeDeleteBtn();

    return this._element;
  }

  getCardId() {
    return this._cardId
  }


  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  isLiked() {
    const userLike = this._likes.find(user => user._id === this._userId);
    return userLike
  }

  _addLike() {
    this._element.querySelector('.element__button-like').classList.add('element__button-like_active');
  }

  _removeLike() {
    this._element.querySelector('.element__button-like').classList.remove('element__button-like_active');
  }

  //Функция лайка
  _likeEl() {
    this._handleLike()
  }

  _removeDeleteBtn() {
    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__button-delete').remove();
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null
  }

  //Функция удаления
  _deleteEl() {
    this._handleDelete();
  }

  //Открытие попапа карточки
  _handleOpenPopup() {
    this._handleCardClick();
  }

  //Слушатель для всех событий на карточке
  _setEventListeners() {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteEl();
      console.log(this._cardId)
    })

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeEl();
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })
  }
}

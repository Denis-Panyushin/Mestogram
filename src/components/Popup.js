export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closePopupBtn = this._popup.querySelector('.popup__escape');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._submitButton = this._popup.querySelector('.popup__submit')
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === 'Esc'){
      this.close(this._popup);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if ((evt.target.classList.contains('popup_opened'))) {
        this.close(this._popup);
      }
    });
    this._closePopupBtn.addEventListener('click', () => {
      this.close(this._popup);
    })
  }
}

import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form')
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Да'
    }
  }
}


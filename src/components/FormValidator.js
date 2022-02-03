export default class FormValidator {
  constructor(configValid, form) {
    this._inputSelector = configValid.inputSelector;//Поле ввода
    this._submitButtonSelector = configValid.submitButtonSelector;//Класс кнопrи отправки данных
    this._inactiveButtonClass = configValid.inactiveButtonClass;//Класс неактивной кнопке отправки
    this._inputErrorClass = configValid.inputErrorClass;//Класс невалидного поля
    this._errorClass = configValid.errorClass;//Класс ошибки
    this._form = document.querySelector(form);//Класс формы
    this._submitButton = this._form.querySelector(this._submitButtonSelector);//Кнопка отправки конкретной формы
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));//Находим все поля ввода
  }

  //Показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  //Скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Проверка валидности
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement, inputElement.validationMessage)
    }
  }

  //Массив невалидных полей
  _hasInvalidInput(inputs) {
    return Array.from(inputs).some((el) => !el.validity.valid);
  }

  //Активация и деактивация кнопки отправки данных
  _toggleButtonError() {
    if (this._hasInvalidInput(this._inputs)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  //Слушатель полей ввода
  _setInputListeners() {
    this._toggleButtonError();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonError();
        this._checkInputValidity(inputElement)
      });
    })
  }

  //Отмена браузерной валидации
  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setInputListeners();
  }

  resetValidation() {
    this._toggleButtonError();

    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}

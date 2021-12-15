//Показать сообщение об ошибке
const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  errorMessage.textContent = errorMessageText;
  errorMessage.classList.add(errorMessageClass);
  input.classList.add(inputErrorClass);
}

//Убрать сообщение об ошибке
const hideError = (form, input, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(errorMessageClass);
  input.classList.remove(inputErrorClass);
}

const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((el) => !el.validity.valid);
}

//Активация и деактивация кнопки отправки данных
const toggleButtonError = (inputs, button, inactiveButtonClass) => {
  console.log(hasInvalidInput(inputs))
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

//Проверка валидности
const checkIfInputValid = (form, input, { inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, errorClass, inputErrorClass);
  } else {
    hideError(form, input, errorClass, inputErrorClass);
  }
}

//Слушатель валидности инпутов
const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkIfInputValid(form, input, rest);
      toggleButtonError(inputs, submitButton,inactiveButtonClass);
    });
  });
}

//Отмена браузерной валидации
const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setInputListeners(form, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
});

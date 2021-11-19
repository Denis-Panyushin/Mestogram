let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__escape');
let popupOpened = document.querySelector('.profile-info__edit-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_description');
let name = document.querySelector('.profile-info__name');
let description = document.querySelector('.profile-info__description');


function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
}

function exitPopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  description.textContent = jobInput.value;

  exitPopup();
}

popupOpened.addEventListener('click', openPopup);

popupClose.addEventListener('click', exitPopup);

formElement.addEventListener('submit', formSubmitHandler);

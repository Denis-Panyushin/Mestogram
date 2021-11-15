let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__escape');
let popupOpened = document.querySelector('.profile-info__edit-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_description');
let name = document.querySelector('.profile-info__name');
let description = document.querySelector('.profile-info__description');
nameInput.value = document.querySelector('.profile-info__name').textContent;
jobInput.value =  document.querySelector('.profile-info__description').textContent;

function popupOpen() {
  popup.classList.add('popup_opened');
}

popupOpened.addEventListener('click', popupOpen);

function popupExit() {
  popup.classList.remove('popup_opened');

  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
}

popupClose.addEventListener('click', popupExit);

function formSubmitHandler(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  description.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

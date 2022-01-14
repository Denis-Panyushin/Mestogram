import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

// Карточки и контенер для них
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Формы для редактирования и добавление карточек
const nameInput = document.querySelector('.popup__text_type_name'); //Поле Имя
const jobInput = document.querySelector('.popup__text_type_description'); //Поле профессии
const infoName = document.querySelector('.profile-info__name'); //Элемент имя
const description = document.querySelector('.profile-info__description'); //Элемент професиия
const profileForm = document.querySelector('.popup_type_edit-profile'); //Форма редактирования страницы
const addCardForm = document.querySelector('.popup_type_add'); //Форма добавления карточки
const openAddCardFormBtn = document.querySelector('.profile__add-button'); //Кнопка открытия попапа добавления карточки
const openProfileFormBtn = document.querySelector('.profile-info__edit-button'); //Кнопка открытия попапа редактирования страницы
const escapeAddCardFormBtn = addCardForm.querySelector('.popup__escape'); //Кнопка закрытия попапа добавления карточки
const escapeProfileFormBtn = profileForm.querySelector('.popup__escape'); // Кнопка закрытия попапа редактирования
const mestoNameInput = document.querySelector('.popup__text_type_location'); //Поле места изображения
const mestoLinkInput = document.querySelector('.popup__text_type_img-link'); //Поле ссылки на изображение
const imagePopup = document.querySelector('.popup_type_image'); //Попап изображения
const escapeImagePopupBtn = imagePopup.querySelector('.popup__escape'); //Кнопка закрытия попа с изображением
const container = document.querySelector('.elements'); //Контейнер для карточек

//Функция создания карточки
function createCard(item) {
  const listItem =  new Card(item, '.template-element').generateEl();
  return listItem
}

//Функция откртия
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escHandler);
};

//Функция закрытия
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escHandler);
};

//Функция слушателя Esc
function escHandler (evt) {
  if (evt.key === "Escape" || evt.key === 'Esc'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Открытие формы добавления карточки
openAddCardFormBtn.addEventListener('click', function () {
  openPopup (addCardForm);

  mestoNameInput.value = '';
  mestoLinkInput.value = '';

  validatorAddCardForm.resetValidation();
});

//Закрытие формы добавления карточки
escapeAddCardFormBtn.addEventListener('click', function () {
  closePopup (addCardForm);
});


//Функция добавления карточки
function addHandlerFormSubmit (evt) {
  evt.preventDefault();
  //Значения полей которые надо сохранить
  const inputMesto = mestoNameInput.value;
  const inputLink = mestoLinkInput.value;

  const newCard = createCard({name: inputMesto, link: inputLink});
  container.prepend(newCard);

  closePopup (addCardForm);
}

addCardForm.addEventListener('submit', addHandlerFormSubmit);

//Открытие формы редактирования профиля
openProfileFormBtn.addEventListener('click', function () {
  openPopup (profileForm);
  //Значения полей ввода при открытии
  nameInput.value = infoName.textContent;
  jobInput.value = description.textContent;

  validatorProfileForm.resetValidation();
});

//Закрытие формы редактирования профиля
escapeProfileFormBtn.addEventListener('click', function () {
  closePopup (profileForm);
});

//Функция редактирования карточки
function editHandlerFormSubmit (evt) {
  evt.preventDefault();
  //Значения полей которые надо сохранить
  infoName.textContent = nameInput.value;
  description.textContent = jobInput.value;

  closePopup(profileForm);
}

profileForm.addEventListener('submit', editHandlerFormSubmit);

//Функция закрытия попапа изображения
escapeImagePopupBtn.addEventListener('click', function () {
  closePopup (imagePopup);
});

//Закрытие попап кликом на оверлэй

//Создаем массив из попапов, чтобы закрывать тот который открылся
Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if  (evt.target === popup && !popup.classList.contains(evt.target)) {
      closePopup(popup);
    }});
});

//Добавления карточек на страницу
initialCards.forEach(item => {
  const cardElement = createCard(item);
  container.append(cardElement);
});

//Классы форм, полей ввода, кнопки отправки и ошибок
const configValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

//Добавление валидации на страницу
const validatorProfileForm = new FormValidator(configValid, profileForm);
const validatorAddCardForm = new FormValidator(configValid, addCardForm);

const enableValidation = () => {
  validatorProfileForm.enableValidation();
  validatorAddCardForm.enableValidation();
};

enableValidation(configValid);


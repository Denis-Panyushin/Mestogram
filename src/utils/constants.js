export const initialCards = [
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

export const nameInput = document.querySelector('.popup__text_type_name'); //Поле Имя
export const jobInput = document.querySelector('.popup__text_type_description'); //Поле профессии
export const infoName = document.querySelector('.profile-info__name'); //Элемент имя
export const description = document.querySelector('.profile-info__description'); //Элемент професиия
export const profileForm = '.popup_type_edit-profile'; //Форма редактирования страницы
export const addCardForm = '.popup_type_add'; //Форма добавления карточки
export const openAddCardFormBtn = document.querySelector('.profile__add-button'); //Кнопка открытия попапа добавления карточки
export const openProfileFormBtn = document.querySelector('.profile-info__edit-button'); //Кнопка открытия попапа редактирования страницы
export const mestoNameInput = document.querySelector('.popup__text_type_location'); //Поле места изображения
export const mestoLinkInput = document.querySelector('.popup__text_type_link'); //Поле ссылки на изображение
export const imagePopup = '.popup_type_image'; //Попап изображения
export const configValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

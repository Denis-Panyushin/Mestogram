import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import '../pages/index.css';

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
const mestoNameInput = document.querySelector('.popup__text_type_location'); //Поле места изображения
const mestoLinkInput = document.querySelector('.popup__text_type_img-link'); //Поле ссылки на изображение
const imagePopup = document.querySelector('.popup_type_image'); //Попап изображения
const container = document.querySelector('.elements'); //Контейнер для карточек
const popupImage = new PopupWithImage(imagePopup)

//Функция создания карточки
function createCard(item) {
  const listItem =  new Card(item, '.template-element', {
    handleCardClick: () => {
     popupImage.open(item);
     popupImage.setEventListeners();
    }
  }).generateEl();
  return listItem
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardEl = createCard(item);
    cardList.addItem(cardEl);
  }
}, '.elements');

cardList.renderItems();

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

const aboutUserClass = new UserInfo({
  userName: infoName,
  userJob: description
});

const formProfileEdit = new PopupWithForm(profileForm, {
  handleFormSubmit: ({ name, description }) => {
    aboutUserClass.setUserInfo({ name, description });
    formProfileEdit.close();
  }
});

openProfileFormBtn.addEventListener('click', function () {
  formProfileEdit.open();
  const aboutUser = aboutUserClass.getUserInfo();
  nameInput.value = aboutUser.userName;
  jobInput.value = aboutUser.userJob;
  validatorProfileForm.resetValidation();
  formProfileEdit.setEventListeners();
})

const formAddCard = new PopupWithForm(addCardForm, {
  handleFormSubmit: ({}) => {
    const inputMesto = mestoNameInput.value;
    const inputLink = mestoLinkInput.value;
    const newCard = createCard({name: inputMesto, link: inputLink});
    container.prepend(newCard);

    formAddCard.close();
  }
});

openAddCardFormBtn.addEventListener('click', function () {
  mestoNameInput.value = '';
  mestoLinkInput.value = '';
  validatorAddCardForm.resetValidation();
  formAddCard.open();
  formAddCard.setEventListeners();
})

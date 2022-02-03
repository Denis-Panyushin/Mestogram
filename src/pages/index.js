import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  infoName,
  description,
  profileForm,
  addCardForm,
  openAddCardFormBtn,
  openProfileFormBtn,
  imagePopup,
  nameInput,
  jobInput,
  configValid
} from "../utils/constants.js"
import './index.css';

const popupImage = new PopupWithImage(imagePopup);

//Функция создания карточки
function createCard(item) {
  const listItem =  new Card(item, '.template-element', {
    handleCardClick: () => {
     popupImage.open(item);
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
})

const formAddCard = new PopupWithForm(addCardForm, {
  handleFormSubmit: ({ location, link }) => {
    const newCard = createCard({ name: location, link: link });
    cardList.addItem(newCard);
    formAddCard.close();
  }
});

openAddCardFormBtn.addEventListener('click', function () {
  validatorAddCardForm.resetValidation();
  formAddCard.open();
});

//Слушатели для форм
formAddCard.setEventListeners();
formProfileEdit.setEventListeners();
popupImage.setEventListeners();

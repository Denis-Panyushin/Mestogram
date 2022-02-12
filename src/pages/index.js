import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

//import './index.css';
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '3c1333af-1822-40dd-897e-bbe104819da6'
})
const popupImage = new PopupWithImage(imagePopup);

//Функция создания карточки
function createCard(data) {
  const listItem =  new Card(data, '.template-element', {
    handleCardClick: () => {
     popupImage.open(data);
    }
  }).generateEl();
  return listItem
}

const cards = api.getCards()
              .then(data => {
              cardList.renderItems(data);
              })
              .catch(err => console.log(err))

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data))
  }
}, '.elements');



//Добавление валидации на страницу
const validatorProfileForm = new FormValidator(configValid, profileForm);
const validatorAddCardForm = new FormValidator(configValid, addCardForm);

const enableValidation = () => {
  validatorProfileForm.enableValidation();
  validatorAddCardForm.enableValidation();
};

enableValidation(configValid);


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
  handleFormSubmit: (data) => {
    api.addCard(data)
    .then(data => {
      const newCard = createCard({ data });
      cardList.addItem(newCard);
      formAddCard.close();
    })
    .catch(err => console.log(err))
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


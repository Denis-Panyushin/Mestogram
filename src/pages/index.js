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
  cardDelPopup,
  avatarEditForm,
  openAvatarEditFormBtn,
  nameInput,
  jobInput,
  configValid,
  deleteCardBtn
} from "../utils/constants.js"
import PopupWithDelete from "../components/PopupWithDelete.js";

import './index.css';
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-37',
  token: 'da74cb24-0bc1-49b8-817b-f1d5c6a0f582'
})
const popupImage = new PopupWithImage(imagePopup);

let aboutUserInfo;

api.getUserInfo()
  .then(data => {
  aboutUserInfo = new UserInfo({ data });
  const userInfo = aboutUserInfo.getUserInfo();
  console.log(aboutUserInfo.getId())
  })
  .catch(err => console.log(err))


let listItem;
let card
//Функция создания карточки
function createCard(data) {
  listItem =  new Card(data, '.template-element', aboutUserInfo.getId(), {
    handleCardClick: () => {
     popupImage.open(data);
    },
    handleDelete: () => {
      formDeleteCard.setSubmitAction(() => api.deleteCard(data._id)
                                              .then(() => {
                                                listItem.deleteCard();
                                                formDeleteCard.close()
                                              })
                                              .catch(err => console.log(err))
                                              )
      formDeleteCard.open()
    },
    handleLike: () => {
      api.addLike
    }
  });
  return listItem.generateEl();
}

const deleteCardHandler = () => {
  console.log('deleteCardHandler');
}

const formDeleteCard = new PopupWithDelete(cardDelPopup, {
  handleFormSubmit: deleteCardHandler,
})

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, '.elements');

api.getCards()
  .then(data => {
    cardList.renderItems(data);
  })
  .catch(err => console.log(err))

//Добавление валидации на страницу
const validatorProfileForm = new FormValidator(configValid, profileForm);
const validatorAddCardForm = new FormValidator(configValid, addCardForm);
const validatorAvatarEditForm = new FormValidator(configValid, avatarEditForm);

const enableValidation = () => {
  validatorProfileForm.enableValidation();
  validatorAddCardForm.enableValidation();
  validatorAvatarEditForm.enableValidation();
};

enableValidation(configValid);

const formAvatarEdit = new PopupWithForm(avatarEditForm, {
  handleFormSubmit: ({ avatar }) => {
    api.setAvatar({ avatar })
    .then(() => {
      aboutUserInfo.setAvatar({ avatar })
      formAvatarEdit.close();
    })
    .catch(err => console.log(err));
  }
})

openAvatarEditFormBtn.addEventListener('click', function () {
  formAvatarEdit.open();
  validatorAvatarEditForm.resetValidation();
})

const formProfileEdit = new PopupWithForm(profileForm, {
  handleFormSubmit: ({ name, description }) => {
    aboutUserClass.setUserInfo({ name, description });
    formProfileEdit.close();
  }
});

openProfileFormBtn.addEventListener('click', function () {
  formProfileEdit.open();
  validatorProfileForm.resetValidation();
})

const formAddCard = new PopupWithForm(addCardForm, {
  handleFormSubmit: (data) => {
    api.addCard(data, aboutUserInfo.getId())
    .then((data) => {
      cardList.addItem(createCard(data));
    })
    .then(() =>{
      formAddCard.close()
    })
    .catch(err => console.log(err))
  }
});

console.log()

openAddCardFormBtn.addEventListener('click', function () {
  validatorAddCardForm.resetValidation();
  formAddCard.open();
});

//Слушатели для форм
formAddCard.setEventListeners();
formProfileEdit.setEventListeners();
popupImage.setEventListeners();
formAvatarEdit.setEventListeners();
formDeleteCard.setEventListeners();

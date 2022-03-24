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

//Функция создания карточки
function createCard(data) {
  const listItem =  new Card(data, '.template-element', aboutUserInfo.getId(), {
    handleCardClick: () => {
     popupImage.open(data);
    },
    handleDelete: () => {
      formDeleteCard.setSubmitAction(() =>
      formDeleteCard.renderLoading(true),
      api.deleteCard(data._id)
        .then(() => {
          listItem.deleteCard();
          formDeleteCard.close()
        })
        .catch(err => console.log(err))
        .finally(() => {
          formDeleteCard.renderLoading(false)
        })
        )
      formDeleteCard.open()
    },
    handleLike: () => {
      if(listItem.isLiked()){
        api.deleteLike(data._id)
        .then(res => {
          listItem.setLikes(res.likes)
        })
        .catch(err => console.log(err))
      } else {
        api.addLike(data._id)
        .then(res => {
          listItem.setLikes(res.likes)
        })
        .catch(err => console.log(err))
      }
    }
  });
  return listItem.generateEl();
}

const deleteCardHandler = () => {
  console.log()
}

const formDeleteCard = new PopupWithDelete(cardDelPopup, {
  handleFormSubmit: () => {
    deleteCardHandler
  },
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
    formAvatarEdit.renderLoading(true),
    api.setAvatar({ avatar })
    .then(() => {
      aboutUserInfo.setAvatar({ avatar })
      formAvatarEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      formAvatarEdit.renderLoading(false)
    })
  }
})

openAvatarEditFormBtn.addEventListener('click', function () {
  formAvatarEdit.open();
  validatorAvatarEditForm.resetValidation();
})

const formProfileEdit = new PopupWithForm(profileForm, {
  handleFormSubmit: (data) => {
    formProfileEdit.renderLoading(true)
    api.setUserInfo(data)
    .then((data) => {
      aboutUserInfo.setUserInfo(data);
      formProfileEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      formProfileEdit.renderLoading(false)
    })
  }
});

openProfileFormBtn.addEventListener('click', function () {
  formProfileEdit.open();
  nameInput.value = infoName.textContent;
  jobInput.value = description.textContent;
  validatorProfileForm.resetValidation();
})

const formAddCard = new PopupWithForm(addCardForm, {
  handleFormSubmit: (data) => {
    formAddCard.renderLoading(true)
    api.addCard(data)
    .then(data => {
      const newCard = createCard(data);
      cardList.addItem(newCard);
    })
    .then(() =>{
      formAddCard.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      formAddCard.renderLoading(false)
    })
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
formAvatarEdit.setEventListeners();
formDeleteCard.setEventListeners();

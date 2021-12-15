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

//Добавление карточек в html разметку
const container = document.querySelector('.elements'); //Контейнер для карточек
const templateEl = document.querySelector('#template-element');

function render () {
  const el = initialCards.map((element) => {
    return getEl(element);
  });

  container.append(...el);
};

render();
//Функция генерации элемента
function getEl (element) {
  const newItem = templateEl.content.cloneNode(true);
  const img = newItem.querySelector('.element__image');
  const description = newItem.querySelector('.element__description');
  description.textContent = element.name;
  img.setAttribute('src', element.link);

  const deleteBtn = newItem.querySelector('.element__button-delete');
  deleteBtn.addEventListener('click', deleteEl);

  const likeBtn = newItem.querySelector('.element__button-like');
  likeBtn.addEventListener('click', likeEl);

  img.addEventListener('click', function () {
    popupDescription.textContent = element.name;
    popupPicture.setAttribute('src', element.link);
    openPopup(imagePopup);
  });


  return newItem;
};

//Функция удаления карточки
function deleteEl (evt) {
  const targetEl = evt.target;
  const listItem = targetEl.closest('.element');
  listItem.remove();
};

//Функция лайка карточки
function likeEl (evt) {
  const targetEl = evt.target;
  const listItem = targetEl.closest('.element__button-like');

  listItem.classList.toggle('element__button-like_active');
};

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
const popupPicture = imagePopup.querySelector('.popup__pic'); //Картинка карточки для попапа с изображением
const popupDescription = imagePopup.querySelector('.popup__description'); //Название места изображения
const escapeImagePopupBtn = imagePopup.querySelector('.popup__escape'); //Кнопка закрытия попа с изображением

//Функция откртия
function openPopup (popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытия
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

//Открытие формы добавления карточки
openAddCardFormBtn.addEventListener('click', function () {
  openPopup (addCardForm);

  mestoNameInput.value = '';
  mestoLinkInput.value = '';
});

//Закрытие формы добавления карточки
escapeAddCardFormBtn.addEventListener('click', function () {
  closePopup (addCardForm);
});

//Функция добавления карточки
function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  //Значения полей которые надо сохранить
  const inputMesto = mestoNameInput.value;
  const inputLink = mestoLinkInput.value;
  const listItem = getEl({name: inputMesto, link: inputLink});
  container.prepend(listItem);

  closePopup (addCardForm);
}

addCardForm.addEventListener('submit', formSubmitHandlerAdd);

//Открытие формы редактирования профиля
openProfileFormBtn.addEventListener('click', function () {
  openPopup (profileForm);
  //Значения полей ввода при открытии
  nameInput.value = infoName.textContent;
  jobInput.value = description.textContent;
});

//Закрытие формы редактирования профиля
escapeProfileFormBtn.addEventListener('click', function () {
  closePopup (profileForm);
});

//Функция редактирования карточки
function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  //Значения полей которые надо сохранить
  infoName.textContent = nameInput.value;
  description.textContent = jobInput.value;

  closePopup(profileForm);
}

profileForm.addEventListener('submit', formSubmitHandlerEdit);

//Функция закрытия попапа изображения
escapeImagePopupBtn.addEventListener('click', function () {
  closePopup (imagePopup);
});

//Закрытие попапа на клавишу Esc
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
})

//Закрытие попап кликом на оверлэй

//Создаем массив из попапов, чтобы закрывать тот который открылся
Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.addEventListener('click', function () {
      closePopup(popup);
  });
})

//Создаем массив из модальных окон, чтобы отменять закрытие при клике на модальное окно
Array.from(document.querySelectorAll('.popup__form')).forEach((form) => {
  form.addEventListener('click', function (form) {
      form.stopPropagation();
  });
})

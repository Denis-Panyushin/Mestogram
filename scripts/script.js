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
const container = document.querySelector('.elements');
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

  const imgBtn = img
  img.addEventListener('click', function () {
    const imagePopup = document.querySelector('.popup__image');
    const popupPicture = document.querySelector('.popup__pic')
    const popupDescription = document.querySelector('.popup__description');
    popupDescription.textContent = element.name;
    popupPicture.setAttribute('src', element.link);
    openPopup(imagePopup);
    imagePopup.classList.add('popup_opened');

    const escapeImagePopupBtn = imagePopup.querySelector('.popup__escape')
    escapeImagePopupBtn.addEventListener('click', function () {
      exitPopup ();

    })

  });


  return newItem;
}

//Функция удаления карточки
function deleteEl (evt) {
  const targetEl = evt.target;
  const listItem = targetEl.closest('.element');
  listItem.remove();
}

//Функция лайка карточки
function likeEl (evt) {
  const targetEl = evt.target;
  const listItem = targetEl.closest('.element__button-like');

  listItem.classList.toggle('element__button-like_active');
}

//Формы для редактирования и добавление карточек
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_description');
const infoName = document.querySelector('.profile-info__name');
const description = document.querySelector('.profile-info__description');
const editPopup = document.querySelector('.popup__edit-profile');
const addPopup = document.querySelector('.popup__add');
const openAddPopupBtn = document.querySelector('.profile__add-button')
const openEditPopupBtn = document.querySelector('.profile-info__edit-button');
const escapeAddPopupBtn = addPopup.querySelector('.popup__escape');
const escapeEditPopupBtn = editPopup.querySelector('.popup__escape');
const mestoNameInput = document.querySelector('.popup__text_type_location');
const mestoLinkInput = document.querySelector('.popup__text_type_img-link');
const form = document.getElementById('form');

//Функция откртия
function openPopup () {
  popup.classList.add('popup_opened');
};

const imagePopup = document.querySelector('.popup__image');
//Функция закрытия
function exitPopup () {
  if (popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
      addPopup.classList.remove('popup_opened');
      editPopup.classList.remove('popup_opened');
      imagePopup.classList.remove('popup_opened');
  }
};

//Открытие формы добавления карточки
openAddPopupBtn.addEventListener('click', function () {
  openPopup ();
  addPopup.classList.add('popup_opened');

  mestoNameInput.value = '';
  mestoLinkInput.value = '';
});

//Закрытие формы добавления карточки
escapeAddPopupBtn.addEventListener('click', function () {
  exitPopup ();
});

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  //Значения полей которые надо сохранить
  const inputMesto = mestoNameInput.value;
  const inputLink = mestoLinkInput.value;
  const listItem = getEl({name: inputMesto, link: inputLink});
  container.prepend(listItem);

  exitPopup (addPopup);
}

addPopup.addEventListener('submit', formSubmitHandlerAdd);

//Открытие формы редактирования профиля
openEditPopupBtn.addEventListener('click', function () {
  openPopup ();
  editPopup.classList.add('popup_opened');
  //Значения полей ввода при открытии
  nameInput.value = infoName.textContent;
  jobInput.value = description.textContent;
});

//Закрытие формы редактирования профиля
escapeEditPopupBtn.addEventListener('click', function () {
  exitPopup ();
});

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  //Значения полей которые надо сохранить
  infoName.textContent = nameInput.value;
  description.textContent = jobInput.value;

  exitPopup(editPopup);
}

editPopup.addEventListener('submit', formSubmitHandlerEdit);


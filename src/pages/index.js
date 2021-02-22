import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PoupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import {
  cardList,
  avatarButton,
  jobInput,
  nameInput,
  validationConfig,
  popupButton,
  addCardButton,
} from "../utils/constants.js";

import plus from "../image/plus.svg";
import CloseIcon from "../image/CloseIcon.svg";
import jalIvKusto from "../image/jalIvKusto.png";
import like from "../image/like.svg";
import liked from "../image/liked.svg";
import rubish from "../image/rubish.svg";
import buttonbig from "../image/buttonbig.svg";
import Vector from "../image/Vector.svg";
import infoButton from "../image/infoButton.svg";

import "./index.css";

const whoIsTheGoat = [
  { name: "CloseIcon", image: CloseIcon },
  { name: "jalIvKusto", link: jalIvKusto },
  { name: "Vector", link: Vector },
  { name: "liked", link: liked },
  { name: "like", link: like },
  { name: "buttonbig", link: buttonbig },
  { name: "plus", link: plus },
  { name: "rubish", link: rubish },
  { name: "infoButton", link: infoButton },
];
const api = new Api({
  authorization: "163e8218-97fb-40af-9cef-c2077618dc41",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-20/cards/",
  userUrl: "https://mesto.nomoreparties.co/v1/cohort-20/users/me",
});

const popupDelete = new PopupWithForm({
  popupSelector: "#pop-up-delete",
  handleSubmit: () =>{}
})
popupDelete.setEventListeners();



const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      imagePopup.open(item);
    },
    cardSelector: "#element",
    clickDelete: () => {
      popupDelete.setSubmitAction( () => {
          api
            .deleteCard(card.returnId())
            .then(() => {
              card.deleteCard();
            })
            .then(() => {
              popupDelete.close();
              
            });
        }),
     
      popupDelete.open();
    },
    clickLike: () => {
      if (!card.checkLike()) {
        api.addLike(card.returnId()).then((data) => {
          card.setLikeQuantity(data),
          card.likeCard();
        });
      } else {
        api.deleteLike(card.returnId()).then((data) => {
          card.setLikeQuantity(data), card.likeCard();
        });
      }
    },
  });
  return card;
};



const imagePopup = new PopupWithImage("#pop-up-image");
imagePopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: "#pop-up-card",
  handleSubmit: ((obj) => {
    api
      .addCard(obj)
      .then((data) => {
        cardList.prepend(createCard(data).generateCard());
      })
      .then(() => cardPopup.close());
  }),
});
cardPopup.setEventListeners();

const newCardValidator = new FormValidator(
  validationConfig,
  "#pop-up__form-card"
);
newCardValidator.enableValidation();

const profileValidator = new FormValidator(
  validationConfig,
  "#pop-up__form-profile"
);
profileValidator.enableValidation();

const avatarPopupValidator = new FormValidator(
  validationConfig,
  "#pop-up__form-avatar"
);
avatarPopupValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  infoSelector: ".profile-info__subtitle",
  avatarSelector: ".profile__avatar"
});
api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
});

const popupWithProfile = new PopupWithForm({
  popupSelector: "#pop-up-profile",
  handleSubmit: (obj) => {
    api
      .setProfile(obj)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => popupWithProfile.close());
  },
});
popupWithProfile.setEventListeners();

api.getInitialCards().then((data) => {
  const section = new Section(
    {
      items: data,
      renderer: (item) => {
        const newCard = createCard(item).generateCard();
        section.prependItem(newCard);
      },
    },
    ".elements"
  );
  section.renderItems();
});

const avatarPopup = new PopupWithForm({
  popupSelector: "#pop-up-Avatar",
  handleSubmit: (obj) => {
    api
      .setAvatar(obj)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        avatarPopup.close();
      });
  },
});
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

popupButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  profileValidator.resetValidation();
  popupWithProfile.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  cardPopup.open();
});

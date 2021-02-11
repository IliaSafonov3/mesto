import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { validationConfig, initialCards,main ,popupButton,addCardButton } from "../utils/constants.js";
import { PopupWithImage } from "../components/PoupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/section.js";

import plus from "../image/plus.svg"
import CloseIcon from "../image/CloseIcon.svg"
import jalIvKusto from "../image/jalIvKusto.png"
import like from "../image/like.svg"
import liked from "../image/liked.svg"
import rubish from "../image/rubish.svg"
import buttonbig from "../image/buttonbig.svg"
import Vector from "../image/Vector.svg"
import infoButton from "../image/infoButton.svg"




import "./index.css"

const whoIsTheGoat = [
    { name: 'CloseIcon', image: CloseIcon },
    { name: 'jalIvKusto', link : jalIvKusto },
    { name: 'Vector', link: Vector },
    { name: 'liked', link: liked },
    { name: 'like', link: like }, 
    { name: 'buttonbig', link: buttonbig },
    { name: 'plus', link: plus },
    { name: 'rubish', link: rubish },
    { name: 'infoButton', link: infoButton }
];

export const popupImageSource = document.querySelector(".pop-up__image");
export const popupImageText = document.querySelector(".pop-up__image-text");
export const popupImage = document.querySelector("#pop-up-image");

const imagePopup = new PopupWithImage("#pop-up-image");

const cardPopup = new PopupWithForm({
  popupSelector: "#pop-up-card",
  handleSubmit: (obj) => {
    const card = new Card({
      data: obj,
      handlCardClick: () => {
        cardPopup.open(obj);
        cardPopup.setEventListeners();
      },
      cardSelector: "#element",
    });
    section.addItem(card.generateCard());
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  infoSelector: ".profile-info__subtitle",
});

const PopupWithProfile = new PopupWithForm({
  popupSelector: "#pop-up-profile",
  handleSubmit: (obj) => {
    userInfo.setUserInfo(obj);
  },
});
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: () => {
          imagePopup.open(item), imagePopup.setEventListeners();
        },
        cardSelector: "#element",
      });
      const newCard = card.generateCard();
      section.addItem(newCard);
    },
  },
  ".elements"
);

section.renderItems();

popupButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  PopupWithProfile.setInputsValues(userInfo.getUserInfo());
  PopupWithProfile.open();
  PopupWithProfile.setEventListeners();
});

addCardButton.addEventListener("click", () => {
  cardPopup.open();
  cardPopup.setEventListeners();
});
const profileValidator = new FormValidator(
  validationConfig,
  "#pop-up__form-profile"
);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(
  validationConfig,
  "#pop-up__form-card"
);
newCardValidator.enableValidation();

 

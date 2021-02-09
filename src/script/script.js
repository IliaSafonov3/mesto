import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { validationConfig, initialCards } from "./data.js";
import { PopupWithImage } from "./PoupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./section.js";

const main = document.querySelector(".main-content");
const popupButton = main.querySelector(".profile-info__button");
const addCardButton = document.querySelector(".profile__button");
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

export function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", keydownEscape);
}

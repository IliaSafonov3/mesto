import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { jobInput, nameInput, validationConfig, initialCards,popupButton,addCardButton } from "../utils/constants.js";
import { PopupWithImage } from "../components/PoupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

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
function createCard(item,cardSelector){
  const card = new Card({
    data: item,
    handleCardClick: () => {
      imagePopup.open(item);
    },
    cardSelector: cardSelector,
  })
  return card
};



const imagePopup = new PopupWithImage("#pop-up-image");
imagePopup.setEventListeners()

const cardPopup = new PopupWithForm({
  popupSelector: "#pop-up-card",
  handleSubmit: (obj) => {
    section.prependItem(createCard(obj,'#element').generateCard());
  },
});
cardPopup.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  infoSelector: ".profile-info__subtitle",
});

const popupWithProfile = new PopupWithForm({
  popupSelector: "#pop-up-profile",
  handleSubmit: (obj) => {
    userInfo.setUserInfo(obj);
  },
});
popupWithProfile.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item,'#element').generateCard();
      section.prependItem(newCard);
    },
  },
  ".elements"
);

section.renderItems();
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

popupButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo()
 nameInput.value = userData.name
 jobInput.value = userData.info
  profileValidator.resetValidation()
  popupWithProfile.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation()
  cardPopup.open();
});


 

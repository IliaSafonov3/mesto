import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    super.open();
    this._popupElement.querySelector(".pop-up__image").src = data.link;
    this._popupElement.querySelector(".pop-up__image-text").textContent =
      data.name;
  }
}

import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElementImage = this._popupElement.querySelector(".pop-up__image")
    this._popupElementText = this._popupElement.querySelector(".pop-up__image-text")
  }
  open(data) {
    this._popupElementText.textContent = data.name;
    this._popupElementImage.src = data.link;
    super.open();
  }
}

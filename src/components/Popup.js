export class Popup {
  constructor(popupSelector) {
    this._handleEscClose = this._handleEscClose.bind(this);
    this._OverlayClick = this._OverlayClick.bind(this);
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("pop-up_opened");
  }
  close() {
    this._popupElement.classList.remove("pop-up_opened");
  }

  _OverlayClick(evt) {
    if (evt.target.classList.contains("pop-up__overlay")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement
      .querySelector("pop-up__close")
      .addEventListener("click", () => {
        this.close();
      });
  }

  setEventListeners() {
    if (this._popupElement.classList.contains("pop-up_opened")) {
      document.addEventListener("keydown", this._handleEscClose);
      this._popupElement.addEventListener("click", this._OverlayClick);
      this._popupElement
        .querySelector(".pop-up__close")
        .addEventListener("click", () => {
          this.close();
        });
    } else {
      document.removeEventListener("keydown", this._handleEscClose);
      this._popupElement.removeEventListener("click", this._OverlayClick);
    }
  }
}

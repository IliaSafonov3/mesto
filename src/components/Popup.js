export class Popup {
  constructor(popupSelector) {
    this._handleEscClose = this._handleEscClose.bind(this);
    this._overlayClick = this._overlayClick.bind(this);
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("pop-up_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._overlayClick);
  }
  close() {
    this._popupElement.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._overlayClick);
  }

  _overlayClick(evt) {
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
          .querySelector(".pop-up__close")
          .addEventListener("click", () => {
            this.close();
          })
        }
      }
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll("input");
    this._InputValues = {};
    this._inputList.forEach((input) => {
      this._InputValues[input.name] = input.value;
    });
    console.log(this._InputValues);
    return this._InputValues;
  }
  close() {
    super.close();
  }
  setInputsValues(object) {
    this._popupElement.querySelector(".pop-up__name").value = object.name;
    this._popupElement.querySelector(".pop-up__self").value = object.info;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handleSubmit(this._InputValues);
      this.close();
    });
  }
}

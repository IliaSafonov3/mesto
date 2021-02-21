import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector("form");
    this._inputList = this._popupElement.querySelectorAll("input");
    this._saveButton = this._form.querySelector('.pop-up__save')
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  close() {
    super.close();
    this._form.reset() 
    if(this._saveButton.textContent === 'Сохранение...'){
      this._saveButton.textContent = 'Сохранить';
  }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handleSubmit(this._inputValues);
      if(this._saveButton.textContent === 'Сохранить'){
        this._saveButton.textContent = 'Сохранение...';
    }
      this.close();

    });

  }
}

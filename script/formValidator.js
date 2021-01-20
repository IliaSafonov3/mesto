export class FormValidator {
  constructor(data, formId) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formId = formId;
  }

  _showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }
  _hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }
  _checkInputValidity(form, input) {
    if (input.validity.valid) {
      this._hideError(form, input);
    } else {
      this._showError(form, input);
    }
  }

  _setButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
  }
  _settEventListner(form) {
    const inputList = form.querySelectorAll(this._inputSelector);
    const submitButton = form.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(form, input);
        this._setButtonState(submitButton, form.checkValidity());
      });
    });
  }
  enableValidation() {
    const form = document.querySelector(this._formId);
    this._settEventListner(form);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const submitButton = form.querySelector(this._submitButtonSelector);
    this._setButtonState(submitButton, form.checkValidity());
  }
}

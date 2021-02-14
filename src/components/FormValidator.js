export class FormValidator {
  constructor(data, formId) {
    this._form = document.querySelector(formId);
    this._inputList = this._form.querySelectorAll(data.inputSelector) ;
    this._submitButton =  this._form.querySelector(data.submitButtonSelector);
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }
  

  _showError( input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }
  _hideError( input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }
  _checkInputValidity( input) {
    if (input.validity.valid) {
      this._hideError( input);
    } else {
      this._showError( input);
    }
  }

  _setButtonState() {
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }
  _settEventListner() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity( input);
        this._setButtonState( );
      });
    });
  }
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });

    this._setButtonState();
  }
  enableValidation() {
    this._settEventListner(this._form);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setButtonState();
  }
}

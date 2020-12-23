
const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__save',
    inactiveButtonClass: 'pop-up__save_invalid',
    inputErrorClass: 'pop-up__input_invalid',
    errorClass: 'popup__error_visible'
  }

const formAdd = document.querySelector('#pop-up__form-profile');
const inputName = formAdd.querySelector('#name')
const inputList = formAdd.querySelectorAll('.pop-up__input');
const submitButton = formAdd.querySelector('.pop-up__save');

formAdd.addEventListener('submit', (evt) =>{
    evt.preventDefault();
});

function showError (form, input,config){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

function hideError (form, input,config){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
}

 function checkInputValidity(form, input,config) {
    if(input.validity.valid){
        hideError (form, input,config)
    } else {
        showError (form, input,config)
    }
 }

function setButtonState(button, isActive, config){
    if(isActive){
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}



function settEventListner(form,config){
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input',(evt) => {
            checkInputValidity(form,input,config)
            setButtonState(submitButton,form.checkValidity(),config);
        });
    });
}

function enableValidation(config){
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        settEventListner(form,config);
        form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
        });
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton,form.checkValidity(),config);
    });

}

enableValidation(validationConfig)


import { Card } from "./card.js"
import { FormValidator } from "./formValidator.js"
import {validationConfig , initialCards} from './data.js'
const main = document.querySelector('.main-content');
const popupProfile = document.querySelector('#pop-up-profile');
const formElement = document.querySelector('#pop-up__container-profile');
const popupButton = main.querySelector('.profile-info__button');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#self');
const name = main.querySelector('.profile-info__name');
const job = main.querySelector('.profile-info__subtitle');
const popupCard = document.querySelector('#pop-up-card');
const elements = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__button');
const formAddCard = document.querySelector('#pop-up__form-card');
const linkValue = document.querySelector('#imageSrc');
const cardNameValue = document.querySelector('#cardName');
const popupList = document.querySelectorAll('.pop-up');


const profileValidator = new FormValidator(validationConfig, '#pop-up__form-profile')
profileValidator.enableValidation()

const newCardValidator = new FormValidator(validationConfig, '#pop-up__form-card')
newCardValidator.enableValidation()

function addCard (evt) {
    evt.preventDefault(); 
    const newCardObject = {
        name: cardNameValue.value,
        link: linkValue.value
    };
    const newcard = new Card (newCardObject, '#element')
    const cardElement = newcard.generateCard();

     elements.prepend(cardElement);

    closePopup(popupCard);
    formAddCard.reset();
}

formAddCard.addEventListener('submit', addCard);

initialCards.forEach((item)=>{
    const card = new Card (item , '#element')
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
});


function keydownEscape (evt){
    if (evt.key === 'Escape'){
        closePopup(document.querySelector('.pop-up_opened'))
        };
}

function openPopup(popup){
    popup.classList.add('pop-up_opened')
    document.addEventListener('keydown',keydownEscape)

};
export function closePopup(popup){
    popup.classList.remove('pop-up_opened')
    document.removeEventListener('keydown',keydownEscape)
};



function fillProfilePopupForm(){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}


function handleProfileSubmi (evt) {
    evt.preventDefault();
    closePopup(popupProfile);

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}


function addEventListenerToCloseButton(popup,button){
    button.addEventListener('click',function(){
        closePopup(popup);
    });
}
function addEventListenerToOverlay(popup,overlay){
    overlay.addEventListener('click',function(){
        closePopup(popup)
    })
}

function addAllcloseFunctionToPopup(popups){
    popups.forEach(popup => {
        const button = popup.querySelector('.pop-up__close');
        const overlay = popup.querySelector('.pop-up__overlay');

        addEventListenerToCloseButton(popup,button);
        addEventListenerToOverlay(popup,overlay);
    })
    
}

addAllcloseFunctionToPopup(popupList)


addCardButton.addEventListener('click',function(){
    openPopup(popupCard);
    
});
popupButton.addEventListener('click',function (){
    openPopup(popupProfile);
    fillProfilePopupForm();
});




formElement.addEventListener('submit', handleProfileSubmi);












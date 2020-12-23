const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 
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
const template = elements.querySelector('#element').content;
const addCardButton = document.querySelector('.profile__button');
const formAddCard = document.querySelector('#pop-up__form-card');
const popupImage = document.querySelector('#pop-up-image');
const popupCardImage = document.querySelector('.pop-up__image')
const popupImageText = document.querySelector('.pop-up__image-text')
const linkValue = document.querySelector('#imageSrc');
const cardNameValue = document.querySelector('#cardName');
const popupList = document.querySelectorAll('.pop-up');


function addCard (evt) {
    evt.preventDefault(); 
    const newCardObject = {
        name: cardNameValue.value,
        link: linkValue.value
    };
    addNewCard(createNewCard(newCardObject));
    closePopup(popupCard);
    formAddCard.reset();
}

formAddCard.addEventListener('submit', addCard);


function createNewCard(el){
    const newElement = template.cloneNode(true);
    const elementImage = newElement.querySelector('.element__image');
    const elementImageText = newElement.querySelector('.element__title');
    elementImage.src = el.link;
    elementImageText.textContent = el.name;
    const card = newElement.querySelector('.element');
    const like = newElement.querySelector('.element__like');
    const trashcan = newElement.querySelector('.element__trashcan');

    elementImage.addEventListener('click', function(){
        popupCardImage.src = elementImage.src;
        popupImageText.textContent = elementImageText.textContent;
        openPopup(popupImage);
    })
    trashcan.addEventListener('click',function(){
        deleteCard(card);
    })
    like.addEventListener('click',function(){
        likeCard(like);
    })
    return newElement
};
 function addNewCard(card){
    elements.prepend(card);
 }

initialCards.forEach((elem) => {
    addNewCard(createNewCard(elem));
   });

function openPopup(popup){
    popup.classList.add('pop-up_opened')
};
function closePopup(popup){
    popup.classList.remove('pop-up_opened')
};

function deleteCard (card){
    card.remove();
}


function fillProfilePopupForm(){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}


function likeCard (el){
    el.classList.toggle('element__like_liked');
};
function formSubmitHandler (evt) {
    evt.preventDefault();
    closePopup(popupProfile);

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}


function checkPopup (popup){
    if(popup.classList.contains('pop-up_opened'))
    return true
}


function CheckaAndClosePopup (evt,popup){
    if((checkPopup(popup)) && (evt.key === 'Escape')){
    closePopup(popup)
    };
};

function addEventListenerToEscape(popup){
    document.addEventListener('keydown', function(evt){
        CheckaAndClosePopup(evt,popup)   
    })
};

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

        addEventListenerToEscape(popup);
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




formElement.addEventListener('submit', formSubmitHandler);












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
const popupclose = document.querySelector('#pop-up__close-profile')
const popupProfile = document.querySelector('#pop-up-profile');
const formElement = document.querySelector('#pop-up__container-profile');
const popupButton = main.querySelector('.profile-info__button');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#self');
const name = main.querySelector('.profile-info__name');
const job = main.querySelector('.profile-info__subtitle');
const popupCard = document.querySelector('#pop-up-card');
const closeButtonCard = document.querySelector('#pop-up__close-card')
const elements = document.querySelector('.elements');
const template = elements.querySelector('#element').content;
const addCardButton = document.querySelector('.profile__button');
const formAddCard = document.querySelector('#pop-up__form-card');
const popupImage = document.querySelector('#pop-up-image');
const popupCardImage = document.querySelector('.pop-up__image')
const popupImageText = document.querySelector('.pop-up__image-text')
const popupImageCloseButton = document.querySelector('#pop-up__close-Image')
const linkValue = document.querySelector('#imageSrc');
const cardNameValue = document.querySelector('#cardName');
function addCard (evt) {
    evt.preventDefault(); 
    const newCardObject = {
        name:'',
        link:''
    };
    newCardObject.name = cardNameValue.value;
    newCardObject.link = linkValue.value;
    addNewCard(newCardObject);
    cardOpen();
}
formAddCard.addEventListener('submit', addCard)
 initialCards.forEach((elem) => {
 addNewCard(elem)
});
function addNewCard(el){
    const newElement = template.cloneNode(true);
    const elementImage = newElement.querySelector('.element__image');
    const elementImageText = newElement.querySelector('.element__title');
    elementImage.src = el.link;
    elementImageText.textContent = el.name;
    const card = newElement.querySelector('.element');
    const like = newElement.querySelector('.element__like');
    const trashcan = newElement.querySelector('.element__trashcan');

    elementImage.addEventListener('click', function(){
        popupCardImage.src = elementImage.src
        popupImageText.textContent = elementImageText.textContent
        openImage()
    })
    trashcan.addEventListener('click',function(){
        deleteCard(card);
    })
    like.addEventListener('click',function(){
        liked(like);
    })
    elements.prepend(newElement);
};

function openImage(){
    popupImage.classList.toggle('pop-up_opened');
}

function deleteCard (trsh){
    trsh.remove();
}

function cardOpen(){
    popupCard.classList.toggle('pop-up_opened');
    cardNameValue.value = standartName;
    linkValue.value = standartLink;

}

function popUpInput(){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}
function openClose(){
    popupProfile.classList.toggle('pop-up_opened')
};

function liked(el){
    el.classList.toggle('element__like_liked');
};
function formSubmitHandler (evt) {
    evt.preventDefault();
    openClose();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}
popupImageCloseButton.addEventListener('click',openImage);
addCardButton.addEventListener('click',cardOpen);
formElement.addEventListener('submit', formSubmitHandler);
popupButton.addEventListener('click',function (){
    openClose();
    popUpInput();
});
popupclose.addEventListener('click',openClose);
closeButtonCard.addEventListener('click',cardOpen);

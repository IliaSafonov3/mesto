const main = document.querySelector('.main-content');
const popupclose = document.querySelector('.pop-up__close')
const popup = document.querySelector('.pop-up');
let formElement = document.querySelector('.pop-up__container');
const popupButton = main.querySelector('.profile-info__button');
let nameInput = formElement.querySelector('.pop-up__name');
let jobInput = formElement.querySelector('#self');
let name = main.querySelector('.profile-info__name');
let job = main.querySelector('.profile-info__subtitle');
const likes = main.querySelectorAll('.element__like');

function popUpInput(){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}
function openClose(){
    popup.classList.toggle('pop-up_opened')
};

function liked(element){
    element.classList.toggle('element__like_liked');
};
function formSubmitHandler (evt) {
    evt.preventDefault();
    openClose();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}
for (let i = 0; i<likes.length ; i=i + 1){
    likes[i].addEventListener('click', function (){
        liked(likes[i])
    })
};
formElement.addEventListener('submit', formSubmitHandler);
popupButton.addEventListener('click',function (){
    openClose();
    popUpInput();
});//работает
popupclose.addEventListener('click',openClose);
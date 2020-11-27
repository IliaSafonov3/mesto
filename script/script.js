const main = document.querySelector('.main-content');

const popupclose = document.querySelector('.pop-up__close')
const popupButton = main.querySelector('.profile-info__button');
const popup = document.querySelector('.pop-up');
function open(){
    popup.classList.toggle('pop-up_opened')
};
popupButton.addEventListener('click',open);//работает
popupclose.addEventListener('click',open);



const likes = main.querySelectorAll('.element__like');
function liked(element){
    element.classList.toggle('element__like_liked');
};
for (let i = 0; i<likes.length ; i=i + 1){
    likes[i].addEventListener('click', function (){
        liked(likes[i])
    })
};
let formElement = document.querySelector('.pop-up__container');
function formSubmitHandler (evt) {
    evt.preventDefault();
    open();
    let nameInput = formElement.querySelector('.pop-up__name');
    let jobInput = formElement.querySelector('.pop-up__self');
    let name = main.querySelector('.profile-info__name');
    let job = main.querySelector('.profile-info__subtitle');
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);

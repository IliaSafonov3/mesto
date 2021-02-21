
export class Card {
  constructor({ data, handleCardClick, cardSelector,clickDelete,clickLike }) {
    this._id = data._id;
    this._owner = data.owner;
    this._clickDelete = clickDelete;
    this._clickLike = clickLike;
    this._likes = data.likes;
    this._quantity = this._likes.length;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._trashcan = this._element.querySelector('.element__trashcan');
  }
  addLike(){
    this._quantity = this._quantity + 1;
  }
  dleteLike(){
    this._quantity = this._quantity - 1;
  }
  checkLike(){
    return this._element.querySelector('.element__like').classList.contains('element__like_liked')
  }
  _disabledTrashcanButton(){
    this._trashcan.classList.add('element__trashcan_disabled')
  }

  _getTemplate() {
    this._newElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return this._newElement;
  }

  returnId(){
    return this._id
  }

  generateCard() {
    this._setEventListener();

    this._element
    .querySelector('.element__like-quantity')
    .textContent = this._quantity
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    if(this._owner._id != '59ae735b6e0ba87e79c6ff36'){
      this._disabledTrashcanButton()
    } else {
          this._trashcan.classList.remove('element__trashcan_disabled')
    }
    this._likes.forEach((item) => {
      if(item._id === '59ae735b6e0ba87e79c6ff36'){
        this._element.querySelector('.element__like').classList.add('element__like_liked')
      }
    });
    return this._element;
  }

  _setEventListener() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._clickLike();
      });
    this._trashcan
      .addEventListener("click", () => {
        this._clickDelete();
      });
    this._elementImage
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  likeCard () {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_liked");
    this._element
    .querySelector('.element__like-quantity')
    .textContent = this._quantity  
  };

  deleteCard (){
    this._element.remove();
    this._element = '';
  };
}

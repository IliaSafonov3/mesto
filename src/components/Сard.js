
export class Card {
  constructor({ data, handleCardClick, cardSelector }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
  }

  _getTemplate() {
    this._newElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return this._newElement;
  }

  generateCard() {
    this._setEventListener();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  _setEventListener() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".element__trashcan")
      .addEventListener("click", () => {
        this._deleteCard();
      });
      this._elementImage
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _likeCard () {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_liked");
  };

  _deleteCard (){
    this._element.remove();
  };
}

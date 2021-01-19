import {closePopup} from './script.js'

export class Card {
    constructor(data,cardSelector){
        this._name = data.name
        this._link = data.link
        this._cardSelector = cardSelector
    }

    _getTemplate(){
        const newElement = document.
        querySelector(this._cardSelector).
        content.
        querySelector('.element').
        cloneNode(true)
        return newElement
    }

    generateCard(){
        this._element = this._getTemplate()
        this._setEventListener()

        this._element.querySelector('.element__image').src = this._link
        this._element.querySelector('.element__title').textContent = this._name

        return this._element 
    }
    _keydownEscape = (evt) =>{
        if (evt.key === 'Escape'){
            closePopup(document.querySelector('.pop-up_opened'))
            }}
    _openPopup(){
        document.querySelector('#pop-up-image').classList.add('pop-up_opened')
        document.addEventListener('keydown',this._keydownEscape )
        
        document.querySelector('.pop-up__image').src = this._link;
        document.querySelector('.pop-up__image-text').textContent = this._name;
    }

    _setEventListener(){
        this._element.querySelector('.element__like').addEventListener('click', () =>{ this._likeCard()})
        this._element.querySelector('.element__trashcan').addEventListener('click', () => {this._deleteCard()})
        this._element.querySelector('.element__image').addEventListener('click', () => {this._openPopup()})

    }
    
    _likeCard = ()=>{
        this._element.querySelector('.element__like').classList.toggle('element__like_liked');
    }

    _deleteCard = () =>{
        this._element.remove();
    }
}


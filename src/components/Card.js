import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.data.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'card__del-btn' : 'card__del-btn_hidden'}`
  );

  const isLiked = props.data.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.data);
  }

  function handleLikeClick() {
    props.onCardLike(props.data)
  }

  function handleDeleteCard() {
    props.onCardDelete(props.data)
  }

  return (
    <div className="card">
      <img src={props.data.link} alt="#" className="card__photo" onClick={handleClick} />
      <h2 className="card__place-name">{props.data.name}</h2>
      <div className="card__like-container">
        <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
        <p className="card__counter">{props.data.likes.length}</p>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку" onClick={handleDeleteCard}></button>
    </div>
  )
}

export default Card

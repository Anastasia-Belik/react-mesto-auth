import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
            <button type="button" className="profile__avatar-edit-btn" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        {props.cards.map((card, i) => (
          <Card data={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.handleCardLike} onCardDelete={props.handleDeleteCard} />
        ))}

      </section>
    </main>
  )
}

export default Main

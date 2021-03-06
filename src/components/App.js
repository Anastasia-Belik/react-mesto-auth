import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from "./ProtectedRoute"
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';

function App() {

  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistred, setIsRegistred] = React.useState();
  const [email, setEmail] = React.useState('');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(inputValues) {
    api.updateUserInfo(inputValues)  //обновление данных пользователя
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(inputValues) {
    api.updateAvatar(inputValues) //обновление аватара
      .then((data) => {
        setCurrentUser(data);;
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(card) {
    api.deletCard(card._id)
      .then(() => {
        setCards(cards.filter(elem => elem._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(inputValues) {
    api.postNewCard(inputValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

  function handleRegister(password, email) {
    setIsInfoTooltipPopupOpen(true)

    auth.register(password, email)
      .then((res) => {
        if (res) {
          setIsRegistred(true)
        }
      })
      .catch((err) => {
        setIsRegistred(false);
        console.log(err)
      });
  }

  function handleLogin(password, email) {
    setLoggedIn(true);
    auth.authorize(password, email,)
      .then((data) => {
        if (data.token) {
          history.push('/');
        }
      }
      )
      .catch(err => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
          .then((res) => {
            if (res) {
              setEmail(res.data.email);
              setLoggedIn(true);
              history.push('/')
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [history]) //React Hook React.useEffect has a missing dependency: 'history'. Either include it or remove the dependency array


  React.useEffect(() => {
    api.getUserInfo()  //получение данных о юзере
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()  //инициализация карточек
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleSignOut} />
      <Switch>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleDeleteCard={handleDeleteCard}
        />

      </Switch>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        name="infotooltip"
        isRegistred={isRegistred} />

    </CurrentUserContext.Provider>
  );
}



export default App;

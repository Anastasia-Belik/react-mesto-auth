import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function NavBar(props) {

  return (
    <Switch>
      <Route path="/sign-in">
        <Link to="sign-up" className="header__navbar">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to="sign-in" className="header__navbar">Войти</Link>
      </Route>
      <Route path="/">
        <div className="header__navbar">
          <p className="header__user">{props.email}</p>
          <button type="button" onClick={props.onSignOut} className="header__exit">Выйти</button>
        </div>
      </Route>

    </Switch>

  )
}

export default NavBar

import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../Auth';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault()
    const { password, email } = this.state;
    auth.register(password, email)
      .then((response) => {
        try {
          if (response.status === 201) {
            return response.json();
          } else if (response.status === 400) {
            this.props.onRegister(false);
            console.log('Некорректно заполнено одно из полей')
          }
        } catch (e) {
          return (e)
        }
      })
      .then((res) => {
        if (res) {
          this.props.onRegister(true)
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="auth">
        <h2 className="auth__heading">Регистрация</h2>
        <form action="#" name="login" className="auth__form" onSubmit={this.handleSubmit}>
          <fieldset className="auth__fieldset">

            <input id="email-input" className="auth__input" type="email" name="email" value={this.state.email}
              onChange={this.handleChange} placeholder="Email" required minLength="2" maxLength="40" />


            <input id="password-input" className="auth__input" type="password" name="password" value={this.state.password}
              onChange={this.handleChange} placeholder="Пароль" required minLength="2" maxLength="200" />


          </fieldset>
          <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
        </form>
        <div className="auth__login-button">
          <p>
            Уже зарегистрированы? <Link to="sign-in" className="auth__link">Войти</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default Register

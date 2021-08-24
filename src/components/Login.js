import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    if (!this.state.email || !this.state.password) {
      return;
    }
    this.props.onLogin(this.state.password, this.state.email);
  }
  render() {
    return (
      <div className="auth">
        <h2 className="auth__heading">Вход</h2>
        <form action="#" name="login" className="auth__form" onSubmit={this.handleSubmit}>
          <fieldset className="auth__fieldset">

            <input id="email-input" className="auth__input" type="email" name="email" value={this.state.email}
              onChange={this.handleChange} placeholder="Email" required minLength="2" maxLength="40" />


            <input id="password-input" className="auth__input" type="password" name="password" value={this.state.password}
              onChange={this.handleChange} placeholder="Пароль" required minLength="2" maxLength="200" />


          </fieldset>
          <button type="submit" className="auth__submit-button">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);

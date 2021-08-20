

function Login(props) {
  return (
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form action="#" name="login" className="auth__form" onSubmit={props.onSubmit}>
        <fieldset className="auth__fieldset">

          <input id="email-input" className="auth__input" type="email" name="name"
            placeholder="Email" required minLength="2" maxLength="40" />


          <input id="password-input" className="auth__input" type="password" name="about"
            placeholder="Пароль" required minLength="2" maxLength="200" />


        </fieldset>
        <button type="submit" className="auth__submit-button">Войти</button>
      </form>
    </div>
  )
}

export default Login

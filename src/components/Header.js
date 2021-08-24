import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header(props) {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <NavBar email={props.email} onSignOut={props.onSignOut}/>
    </header>
  )
}

export default Header

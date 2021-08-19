function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}` + (props.isOpen ? " popup_opened" : "")}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form action="#" name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm

//поменялось имя формы, слетит валидация

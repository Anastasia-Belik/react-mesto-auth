function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name}` + (props.isOpen ? " popup_opened" : "")}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <div className={`popup__icon` + (props.isRegistred ? " popup__icon_type_success" : " popup__icon_type_fail")}/>
        <h2 className="popup__heading popup__heading_type_infotooltip">
          {props.isRegistred ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
      </div>
    </div>
  )
}

export default InfoTooltip

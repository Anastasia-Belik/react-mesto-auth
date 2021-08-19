function ImagePopup(props) {
  return (
    <div className={`popup popup_type_img` + (props.card ? " popup_opened" : "")}>
      <div className="popup__container popup__container_type_img">
        <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.card?.link} alt={props.card?.name} className="popup__img" />
        <h2 className="popup__heading popup__heading_type_img">{props.card?.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup

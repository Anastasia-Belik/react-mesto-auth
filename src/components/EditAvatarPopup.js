import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    inputRef.current.value = '';
  }

  function handleClosePopup() {
    props.onClose();
    inputRef.current.value = '';
  }

  const inputRef = React.useRef();

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      buttonText="Обновить">
      <fieldset className="popup__fields">
        <div className="popup__input">
          <input id="avatarlink-input" ref={inputRef} className="popup__field popup__field_input_avatar-link" type="url" name="avatar"
            placeholder="Ссылка на аватар" required />
          <span className="popup__error avatarlink-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup

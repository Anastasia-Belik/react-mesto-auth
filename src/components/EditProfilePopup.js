import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="popup__fields">
        <div className="popup__input">
          <input id="name-input" value={name} onChange={handleNameChange} className="popup__field popup__field_input_name" type="text" name="name"
            placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="popup__error name-input-error"></span>
        </div>
        <div className="popup__input">
          <input id="job-input" value={description} onChange={handleDescriptionChange} className="popup__field popup__field_input_job" type="text" name="about"
            placeholder="Вид деятельности" required minLength="2" maxLength="200" />
          <span className="popup__error job-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup

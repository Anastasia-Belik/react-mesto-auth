import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
    setName('');
    setLink('');
  }

  function handleClosePopup() {
    props.onClose();
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm name="new-card" title="Новое место"
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      buttonText="Добавить">
      <fieldset className="popup__fields">
        <div className="popup__input">
          <input id="placename-input" value={name} onChange={handleNameChange} className="popup__field popup__field_input_place-name" type="text" name="name"
            placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__error placename-input-error"></span>
        </div>
        <div className="popup__input">
          <input id="placelink-input" value={link} onChange={handleLinkChange} className="popup__field popup__field_input_place-link" type="url" name="link"
            placeholder="Ссылка на картинку" required />
          <span className="popup__error placelink-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup

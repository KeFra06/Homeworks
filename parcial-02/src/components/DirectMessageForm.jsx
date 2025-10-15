import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDirectMessage, saveDirectMessages } from '../redux/directMessagesSlice';

function DirectMessageForm() {
  const [dm, setDm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dm) {
      dispatch(addDirectMessage(dm));
      dispatch(saveDirectMessages());
      setDm('');
    }
  };

  return (
    <div>
      <h3>Agregar Mensaje Directo Pendiente</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe el mensaje directo"
          value={dm}
          onChange={(e) => setDm(e.target.value)}
          required
        />
        <button type="submit">Agregar a Cola</button>
      </form>
    </div>
  );
}

export default DirectMessageForm;
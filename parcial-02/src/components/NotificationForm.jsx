import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, saveNotifications } from '../redux/notificationsSlice';

function NotificationForm() {
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notification) {
      dispatch(addNotification(notification));
      dispatch(saveNotifications());
      setNotification('');
    }
  };

  return (
    <div>
      <h3>Generar Notificación</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe la notificación"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          required
        />
        <button type="submit">Generar</button>
      </form>
    </div>
  );
}

export default NotificationForm;
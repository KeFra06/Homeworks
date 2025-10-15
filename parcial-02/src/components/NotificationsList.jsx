import { useSelector } from 'react-redux';

function NotificationsList() {
  const notifications = useSelector(state => state.notifications.stack.toArray());

  return (
    <div>
      <h3>Notificaciones Recientes</h3>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsList;
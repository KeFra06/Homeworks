import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

function Header() {
  const dispatch = useDispatch();
  const notificationCount = useSelector(state => state.notifications.stack.size());

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <h1>Red Social UAO</h1>
      <span>Notificaciones pendientes: {notificationCount}</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
export default Header;
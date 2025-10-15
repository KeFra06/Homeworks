import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { loadPosts } from './redux/postsSlice';
import { loadNotifications } from './redux/notificationsSlice';
import { loadDirectMessages } from './redux/directMessagesSlice';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(loadPosts());
        dispatch(loadNotifications());
        dispatch(loadDirectMessages());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
import React from 'react';
import { Login } from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import Crud from './components/Crud';
import Chat from './components/Chat';
import { logout } from './store/slices/auth/authSlice';


function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  return (
      <div>
        {uid ? (
        <>
          <Crud />  
          <Chat /> 
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <Login />
      )}
      </div>
  );
}

export default App;

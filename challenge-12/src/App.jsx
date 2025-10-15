import React from 'react';
import { Login } from './components/Login';
import { useSelector } from 'react-redux';
import Crud from './components/Crud';

function App() {
  const { uid } = useSelector((state) => state.auth);
  return (
      <div>
        {uid ? <Crud /> : <Login /> }
      </div>
  );
}

export default App;

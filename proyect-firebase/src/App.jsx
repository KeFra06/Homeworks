import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Login } from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Autenticación con Firebase</h1>
        <Login />
      </div>
    </Provider>
  );
}

export default App;
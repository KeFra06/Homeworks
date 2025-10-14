import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginWithEmailPassword, startGoogleSignIn, startLogout, startRegisterWithEmailPassword } from '../store/slices/auth/thunks';

export const Login = () => {
  const dispatch = useDispatch();
  const { status, displayName, email, errorMessage } = useSelector(state => state.auth);

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: 'kevin@gmail.com',
    password: 'kevincito123',
    displayName: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(startRegisterWithEmailPassword(form.email, form.password, form.displayName));
    } else {
      dispatch(startLoginWithEmailPassword(form.email, form.password));
    }
  };

  const onGoogleLogin = () => {
    dispatch(startGoogleSignIn());
  };

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div>
      <h2>{isRegister ? 'Registro' : 'Login'}</h2>
      {status === 'authenticated' ? (
        <div>
          <p>Bienvenido, {displayName || email}</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {isRegister && (
            <input
              type="text"
              name="displayName"
              placeholder="Nombre"
              value={form.displayName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isRegister ? 'Registrarse' : 'Login'}</button>
          <button type="button" onClick={onGoogleLogin}>Login con Google</button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{ marginLeft: 8 }}
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};
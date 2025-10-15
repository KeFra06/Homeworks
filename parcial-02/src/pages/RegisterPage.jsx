import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password }));
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
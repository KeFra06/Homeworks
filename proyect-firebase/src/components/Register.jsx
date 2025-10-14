import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAuth } from '../store/slices/auth/thunks';

export const Registro = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: 'kevin@gmail.com',
    password: 'kevincito12345'
  });

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    dispatch(registerAuth(formState.email, formState.password));
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <input name="email" type="email" onChange={(event) => onInputChange(event)} value={formState.email} />
        <input name="password" type="password" onChange={(event) => onInputChange(event)} value={formState.password} />
        <button type="submit">Registro</button>
      </form>
    </div>
  );
};
import React, { useState } from 'react';

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', isbn: '', author: '', editorial: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.isbn) return;
    onAdd({ ...form });
    setForm({ name: '', isbn: '', author: '', editorial: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
      <input name="editorial" value={form.editorial} onChange={handleChange} placeholder="Editorial" />
      <button type="submit">Agregar</button>
    </form>
  );
}

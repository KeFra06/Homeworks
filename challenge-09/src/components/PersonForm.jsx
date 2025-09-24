import React, { useState } from "react";

export default function PersonForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      alert("Ingresa un nombre");
      return;
    }
    const parsed = Number(amount);
    if (Number.isNaN(parsed) || parsed <= 0) {
      alert("Ingresa un monto válido (> 0)");
      return;
    }

    onAdd({ name: trimmed, amount: parsed });
    setName("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Retiro"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

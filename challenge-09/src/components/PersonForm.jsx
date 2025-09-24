import React, { useState } from "react";

export default function PersonForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [datetime, setDatetime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      alert("Ingresa un nombre");
      return;
    }
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Ingresa un monto válido (> 0)");
      return;
    }
    if (!datetime) {
      alert("Selecciona una fecha y hora");
      return;
    }
    
    const timestamp = new Date(datetime).getTime();

    onAdd({ name: trimmed, amount: parsedAmount, timestamp });
    setName("");
    setAmount("");
    setDatetime("");
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
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

import React from "react";

export default function QueueView({ people }) {
  return (
    <div>
      <h2>Clientes - Ordenado por fecha y hora de llegada</h2>
      {people.length === 0 ? (
        <p>La cola está vacía</p>
      ) : (
        <ol>
          {people.map((p, i) => (
            <li key={i}>
              {p.name} — ${p.amount} —{" "}
              {new Date(p.timestamp).toLocaleString()}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

import React from "react";

export default function QueueView({ people }) {
  return (
    <div>
      <h2>Clientes - Cola</h2>
      {people.length === 0 ? (
        <p>La cola está vacía</p>
      ) : (
        <ol>
          {people.map((p, i) => (
            <li key={i}>
              {p.name} — ${p.amount}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

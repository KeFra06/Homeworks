import React from 'react';

export default function BooksStack({ stack }) {
  const items = stack.toArray().slice().reverse();

  return (
    <div>
      <h3>Pila de libros (Se agrega de primero)</h3>
      <ul>
        {items.map((b, i) => (
          <li key={`${b.isbn}-${i}`}>
            {b.name} - {b.author} - {b.isbn} - {b.editorial}
          </li>
        ))}
      </ul>
    </div>
  );
}

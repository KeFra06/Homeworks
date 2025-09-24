import React, { useEffect, useState } from 'react';
import Stack from './stack/Stack';
import { booksMock } from './books/booksMock';
import BookForm from './components/BookForm';
import BooksStack from './components/BooksStack';

export default function App() {
  const [stack, setStack] = useState(() => new Stack());

  useEffect(() => {
    const s = new Stack(booksMock);
    setStack(s);
  }, []);

  function handleAdd(book) {
    const newStack = new Stack(stack.toArray());
    newStack.push(book);
    setStack(newStack);
  }



  return (
    <>
      <h1>Bienvenido a tu editorial de libros (Challenge 08)</h1>
      <BookForm onAdd={handleAdd} />
      <BooksStack stack={stack} />
    </>
  );
}


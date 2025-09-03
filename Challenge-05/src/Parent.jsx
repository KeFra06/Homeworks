import React, { useState, useCallback } from "react";
import Child from "./Child";

export default function Parent() {
  const [numero, setNumero] = useState(null);
  const [suma, setSuma] = useState(0);

  const handleSelect = useCallback((n) => {
    setNumero(n);          
    setSuma((prev) => prev + n);
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <div>El numero seleccionado es: {numero}</div>
      <div>La suma de los numeros seleccionados es: {suma}</div>
      {numbers.map((n) => (
        <Child key={n} n={n} onSelect={handleSelect} />
      ))}
    </div>
  );
}
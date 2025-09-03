import React from "react";

const Child = React.memo(function Child({ n, onSelect }) {
  return <button onClick={() => onSelect(n)}>Botón {n}</button>;
});

export default Child;
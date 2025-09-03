import { useState } from "react";

function ComponentApp({ onAddCategory }) {
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    onAddCategory(category);
    setCategory(""); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe una categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Añadir</button>
    </div>
  );
}

export default ComponentApp;

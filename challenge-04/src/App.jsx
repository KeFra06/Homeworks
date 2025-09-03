import { useState } from "react";
import ComponentApp from "./componentApp";

function App() {
  const [categories, setCategories] = useState([]);

  const addCategory = (newCategory) => {
    if (newCategory.trim() === "") return; 
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="p-4">
      <h1>Challenge #04</h1>
      <ComponentApp onAddCategory={addCategory} />

      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

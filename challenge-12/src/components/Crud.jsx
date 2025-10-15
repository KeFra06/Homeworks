import { useState, useEffect } from 'react';
import useCollection from '../hooks/useCollection';

const Crud = () => {
  const { add, getAll, update, remove, results, isPending, error } = useCollection('items'); 
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    getAll();
  }, []);

  const handleAdd = async () => {
    if (newName) {
      await add({ name: newName });
      setNewName('');
      getAll();
    }
  };

  const startEdit = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
  };

  const handleUpdate = async (id) => {
    if (editName) {
      await update(id, { name: editName });
      setEditId(null);
      setEditName('');
      getAll();
    }
  };

  const handleDelete = async (id) => {
    await remove(id);
    getAll();
  };

  return (
    <div>
      <h1>CRUD con Firestore</h1>
      {error && <p>Error: {error}</p>}
      {isPending && <p>Cargando...</p>}

      {}
      <input 
        type="text" 
        value={newName} 
        onChange={(e) => setNewName(e.target.value)} 
        placeholder="Nuevo item" 
      />
      <button onClick={handleAdd}>Agregar</button>

      {}
      <ul>
        {results.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                />
                <button onClick={() => handleUpdate(item.id)}>Guardar</button>
                <button onClick={() => setEditId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => startEdit(item.id, item.name)}>Editar</button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
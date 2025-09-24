import React, { useRef, useState, useEffect } from "react";
import Queue from "./queues/queue";
import PersonForm from "./components/PersonForm";
import QueueView from "./components/QueueView";

function App() {
  
  const queueRef = useRef(new Queue());
  
  const [people, setPeople] = useState([]);

  const initializedRef = useRef(false);


  
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const mock = [
      { name: "Kevin", amount: 2000 },
      { name: "Luis", amount: 3000 },
      { name: "María", amount: 33000 },
    ];
    const q = queueRef.current;
    mock.forEach((p) => q.enqueue(p));
    setPeople(q.toArray());
    
  }, []);

  const addPerson = (person) => {
    queueRef.current.enqueue(person);
    setPeople(queueRef.current.toArray());
  };

  return (
    <div>
      <h1>ATM - Cajero Automatico (Challenge 09)</h1>

      <PersonForm onAdd={addPerson} />
      <QueueView people={people} />
    </div>
  );
}

export default App;

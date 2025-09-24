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
      { name: "Kevin", amount: 100, timestamp: new Date("2025-09-24T08:30").getTime() },
      { name: "Felipe", amount: 50, timestamp: new Date("2025-09-24T09:15").getTime() },
      { name: "Sofia", amount: 200, timestamp: new Date("2025-09-24T10:00").getTime() },
    ];
    const q = queueRef.current;
    mock.forEach((p) => q.enqueue(p));
    refresh();
  }, []);

  const refresh = () => {
    const arr = queueRef.current.toArray().sort((a, b) => a.timestamp - b.timestamp);
    setPeople(arr);
  };

  const addPerson = (person) => {
    queueRef.current.enqueue(person);
    refresh();
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


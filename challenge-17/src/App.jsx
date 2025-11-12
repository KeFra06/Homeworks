import React, { useState } from "react";
import LinkedListSongs from "./pages/LinkedListSongs";
import DoublyLinkedListBrowser from "./pages/DoublyLinkedListBrowser";

export default function App() {
  const [page, setPage] = useState("linked");

  return (
    <div>
      <header>
        <h1>Reto 07 — Listas enlazadas</h1>
        <div>
          <button onClick={() => setPage("linked")}>Enlazada (Canciones)</button>
          <button onClick={() => setPage("doubly")}>Doble (Navegador)</button>
        </div>
      </header>

      <main>
        {page === "linked" ? <LinkedListSongs /> : <DoublyLinkedListBrowser />}
      </main>
    </div>
  );
}



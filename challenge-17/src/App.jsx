import React, { useState } from "react";
import LinkedListSongs from "./pages/LinkedListSongs";
import DoublyLinkedListBrowser from "./pages/DoublyLinkedListBrowser";
import styles from "./styles/App.module.scss";

export default function App() {
  const [page, setPage] = useState("linked");

  return (
    <div className={styles.app}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <h1 className={styles.title}>Reto 07 — Listas enlazadas</h1>
          <div className={styles.nav}>
            <button className={styles.navButton} onClick={() => setPage("linked")}>Enlazada (Canciones)</button>
            <button className={styles.navButton} onClick={() => setPage("doubly")}>Doble (Navegador)</button>
          </div>
        </header>

        <main className={styles.main}>
          {page === "linked" ? <LinkedListSongs /> : <DoublyLinkedListBrowser />}
        </main>
      </div>
    </div>
  );
}



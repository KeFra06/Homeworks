import React, { useEffect, useState } from "react";
import DoublyLinkedList from "../lists/DoublyLinkedList";

export default function DoublyLinkedListBrowser() {
  const [dlist] = useState(() => new DoublyLinkedList());
  const [currentNode, setCurrentNode] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const pages = [
      { url: "https://site.example/home", title: "Home" },
      { url: "https://site.example/about", title: "About" },
      { url: "https://site.example/products", title: "Products" },
      { url: "https://site.example/contact", title: "Contact" }
    ];
    pages.forEach((p) => dlist.append(p));
    setCurrentNode(dlist.peek(0));
  }, [dlist]);

  function goBack() {
    if (currentNode && currentNode.prev) setCurrentNode(currentNode.prev);
  }

  function goForward() {
    if (currentNode && currentNode.next) setCurrentNode(currentNode.next);
  }

  function removeCurrent() {
    if (!currentNode) return;
    let idx = 0;
    let cur = dlist.head;
    while (cur && cur !== currentNode) {
      cur = cur.next;
      idx++;
    }
    if (cur === currentNode) {
      const removed = dlist.remove(idx);
      const next = removed && removed.next ? removed.next : dlist.peek(0);
      setCurrentNode(next);
      setTick((t) => t + 1);
    }
  }

  return (
    <div>
      <h2>Lista Doblemente Enlazada — Navegador (atrás / adelante)</h2>
      <div>
        <div>Páginas en historial: {dlist.size()}</div>
        {currentNode ? (
          <div>
            <div>Página actual:</div>
            <div>Título: {currentNode.value.title}</div>
            <div>URL: {currentNode.value.url}</div>
            <div>
              <button onClick={goBack} disabled={!currentNode.prev}>Atrás</button>
              <button onClick={goForward} disabled={!currentNode.next}>Adelante</button>
              <button onClick={removeCurrent}>Eliminar actual</button>
            </div>
          </div>
        ) : (
          <div>No hay páginas en el historial</div>
        )}
      </div>

      <div>
        <div>Historial (lista)</div>
        <ol>
          {dlist.print().map((p, i) => (
            <li key={i}>{p.title} — {p.url}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

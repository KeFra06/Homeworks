import React, { useEffect, useState } from "react";
import LinkedList from "../lists/LinkedList";

export default function LinkedListSongs() {
  const [list] = useState(() => new LinkedList());
  const [currentNode, setCurrentNode] = useState(null);
  const [, setTick] = useState(0);

useEffect(() => {
  if (list.size() > 0) return;
  const songs = [
    { title: "Tití Me Preguntó", artist: "Bad Bunny", duration: "3:21" },
    { title: "Me Porto Bonito", artist: "Bad Bunny", duration: "3:07" },
    { title: "Jordan", artist: "Ryan Castro", duration: "3:15" },
    { title: "Tusa", artist: "Karol G", duration: "3:37" },
    { title: "Mi Gente", artist: "J Balvin", duration: "3:06" },
    { title: "Hawái", artist: "Maluma", duration: "3:18" },
    { title: "Se Preparó", artist: "Ozuna", duration: "3:27" },
    { title: "Si Te Vas", artist: "Blessd", duration: "3:10" }
  ];
  songs.forEach((s) => list.append(s));
  setCurrentNode(list.peek(0));
}, [list]);


  function handleNext() {
    if (!currentNode) return;
    if (currentNode.next) setCurrentNode(currentNode.next);
  }

  function handleRemoveCurrent() {
    if (!currentNode) return;
    let idx = 0;
    let cur = list.head;
    while (cur && cur !== currentNode) {
      cur = cur.next;
      idx++;
    }
    if (cur === currentNode) {
      const removed = list.remove(idx);
      const nextNode = removed && removed.next ? removed.next : list.peek(0);
      setCurrentNode(nextNode);
      setTick((t) => t + 1);
    }
  }

  return (
    <div>
      <h2>Lista Enlazada — Reproductor de canciones</h2>
      <div>
        <div>Número de canciones: {list.size()}</div>
        {currentNode ? (
          <div>
            <div>Reproduciendo:</div>
            <div>Título: {currentNode.value.title}</div>
            <div>Artista: {currentNode.value.artist}</div>
            <div>Duración: {currentNode.value.duration}</div>
            <div>
              <button onClick={handleNext} disabled={!currentNode.next}>Siguiente</button>
              <button onClick={handleRemoveCurrent}>Eliminar actual</button>
            </div>
          </div>
        ) : (
          <div>No hay canciones</div>
        )}
      </div>

      <div>
        <div>Lista completa</div>
        <ol>
          {list.print().map((s, i) => (
            <li key={i}>{s.title} — {s.artist} ({s.duration})</li>
          ))}
        </ol>
      </div>
    </div>
  );
}


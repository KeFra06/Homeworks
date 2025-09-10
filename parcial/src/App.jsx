import React, { useEffect, useState } from "react";
import { Son } from "./Son";

export const App = () => {
  const [filtro, setFiltro] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [idNuevo, setIdNuevo] = useState("");
  const [tituloNuevo, setTituloNuevo] = useState("");

  useEffect(() => {
    const guardadas = localStorage.getItem("imagenes");
    const lista = guardadas ? JSON.parse(guardadas) : [];
    setImagenes(lista);

    //Profe, utilizare el localStore para que a la hora de refresacar la pagina, se me guarden las imagenes
    const filtroGuardado = localStorage.getItem("filtro") || "";
    setFiltro(filtroGuardado);

    if (filtroGuardado !== "") {
      const filtradas = lista.filter((img) => img.title.includes(filtroGuardado));
      setImagenes(filtradas);
    }
  }, []);

  //Profe, aca utlizare el window.location.reload para refrescar la pagina y mostrar los cambios
  const buscar = (e) => {
    e.preventDefault();
    localStorage.setItem("filtro", filtro);
    window.location.reload();
  };

  const limpiar = () => {
    localStorage.removeItem("filtro");
    window.location.reload();
  };

  const agregar = (e) => {
    e.preventDefault();
    const idNumero = Number(idNuevo);
    if (isNaN(idNumero)) {
      return;
    }
    const nuevaImagen = {
      id: idNumero,
      title: tituloNuevo,
      url: `https://picsum.photos/id/${idNumero}/200/300`
    };
    const actualizadas = [...imagenes, nuevaImagen];
    localStorage.setItem("imagenes", JSON.stringify(actualizadas));
    window.location.reload();
  };

  return (
    <>
      <h1>Agrega y busca tus imagenes. Parcial 1</h1>
      <p>Hola, debes agregar un ID numerico para tu foto y un titulo, luego podras buscar esa misma foto por el titulo</p>
      <form onSubmit={agregar}>
        <input
          type="number"
          placeholder="ID"
          value={idNuevo}
          onChange={(e) => setIdNuevo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Título"
          value={tituloNuevo}
          onChange={(e) => setTituloNuevo(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <form onSubmit={buscar}>
        <input
          type="text"
          placeholder="Buscar por título"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={limpiar}>Limpiar</button>
      </form>

      <div>
        {imagenes.map((imagen, i) => (
          <Son key={i} url={imagen.url} title={imagen.title} />
        ))}
      </div>
    </>
  );
};







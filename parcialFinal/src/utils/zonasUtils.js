let siguienteId = 1;
export function generarId() {
  return String(siguienteId++);
}

export function agregarZona(zonasArray, parentId, nombreZona) {
  const nueva = { id: generarId(), nombre: nombreZona, children: [] };

  if (!parentId) {
    return [...zonasArray, nueva];
  }

  function agregarRec(list) {
    return list.map(z => {
      if (z.id === parentId) {
        return { ...z, children: [...z.children, nueva] };
      }
      if (z.children && z.children.length) {
        return { ...z, children: agregarRec(z.children) };
      }
      return z;
    });
  }

  return agregarRec(zonasArray);
}

export function editarZona(zonasArray, zonaId, nuevoNombre) {
  function editarRec(list) {
    return list.map(z => {
      if (z.id === zonaId) {
        return { ...z, nombre: nuevoNombre };
      }
      if (z.children && z.children.length) {
        return { ...z, children: editarRec(z.children) };
      }
      return z;
    });
  }
  return editarRec(zonasArray);
}

export function contarZonas(zonasArray) {
  if (!zonasArray || zonasArray.length === 0) return 0;
  return zonasArray.reduce((acc, z) => acc + 1 + contarZonas(z.children), 0);
}

export function alturaMaxima(zonasArray) {
  if (!zonasArray || zonasArray.length === 0) return 0;
  function alturaRec(list) {
    if (!list || list.length === 0) return 0;
    let maxH = 0;
    for (const z of list) {
      const h = 1 + alturaRec(z.children);
      if (h > maxH) maxH = h;
    }
    return maxH;
  }
  return alturaRec(zonasArray);
}

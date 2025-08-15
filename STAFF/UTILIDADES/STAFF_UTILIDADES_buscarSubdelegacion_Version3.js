/**
 * @description: Busca la subdelegación IMSS por los dos primeros dígitos del NSS.
 * @param {string} subNum - Los dos primeros dígitos del NSS.
 * @returns {Object} {subdelegacion, direccion} o null si no encuentra.
 */
function STAFF_utilidades_buscarSubdelegacion(subNum) {
  // Ejemplo de catálogo, reemplaza con tu propio catálogo de subdelegaciones
  const catalogo = {
    "01": { subdelegacion: "CDMX Norte", direccion: "Av. Insurgentes 123, CDMX" },
    "02": { subdelegacion: "CDMX Sur", direccion: "Calz. de Tlalpan 456, CDMX" },
    // ... agrega más según tus necesidades
  };
  return catalogo[subNum] || null;
}
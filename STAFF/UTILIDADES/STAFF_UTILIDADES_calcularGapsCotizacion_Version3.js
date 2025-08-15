/**
 * @description: Calcula los gaps (periodos sin cotización > 1 año) en un arreglo de periodos.
 * @param {Array} periodos - Array de objetos con {alta, baja} en formato dd/mm/yyyy.
 * @returns {Array} Array de gaps: {inicio, fin, desde, hasta}
 */
function STAFF_utilidades_calcularGapsCotizacion(periodos) {
  const gaps = [];
  for (let i = 0; i < periodos.length - 1; i++) {
    const finActual = STAFF_utilidades_parseFecha(periodos[i].baja);
    const inicioSiguiente = STAFF_utilidades_parseFecha(periodos[i + 1].alta);
    const diferencia = (inicioSiguiente - finActual) / (1000 * 60 * 60 * 24 * 365.25);
    if (diferencia > 1) {
      gaps.push({
        inicio: new Date(finActual.getFullYear(), 0, 1),
        fin: new Date(inicioSiguiente.getFullYear(), 11, 31),
        desde: STAFF_utilidades_sumarUnDia(finActual),
        hasta: STAFF_utilidades_restarUnDia(inicioSiguiente),
      });
    }
  }
  return gaps;
}

// Helpers STAFF para fechas
function STAFF_utilidades_parseFecha(fechaStr) {
  // dd/mm/yyyy a Date
  let partes = fechaStr.split("/");
  return new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
}
function STAFF_utilidades_sumarUnDia(fecha) {
  let nueva = new Date(fecha.getTime());
  nueva.setDate(nueva.getDate() + 1);
  return nueva;
}
function STAFF_utilidades_restarUnDia(fecha) {
  let nueva = new Date(fecha.getTime());
  nueva.setDate(nueva.getDate() - 1);
  return nueva;
}
/**
 * Extrae los periodos de cotización del SISEC DETALLADO.
 * Nivel N1
 */
function N1_extraerDatosSISECDetallado(texto) {
  Logger.log("📄 Iniciando análisis de SISEC DETALLADO...");

  const lineas = texto.split("\n");
  const periodos = [];
  let patronActual = null;
  let movimientos = [];
  let fechaBajaGeneral = null;
  let vigente = false;

  let anterior1 = "";
  let anterior2 = "";

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();

    if (linea.startsWith("Nombre del patrón")) {
      if (patronActual) {
        periodos.push(...N1_procesarSISECDetallado(patronActual, movimientos, fechaBajaGeneral, vigente));
      }

      patronActual = (i + 1 < lineas.length) ? lineas[i + 1].trim() : null;
      movimientos = [];
      fechaBajaGeneral = null;
      vigente = false;
      continue;
    }

    if (linea.startsWith("Fecha de baja")) {
      fechaBajaGeneral = (i + 1 < lineas.length) ? lineas[i + 1].trim() : null;
      if (fechaBajaGeneral && fechaBajaGeneral.toUpperCase() === "VIGENTE") {
        fechaBajaGeneral = N1_obtenerUltimoDiaMes();
        vigente = true;
      }
    }

    const tipos = ["ALTA", "REINGRESO", "MODIFICACION DE SALARIO", "BAJA"];
    if (tipos.includes(anterior2.toUpperCase()) &&
        anterior1.match(/^\d{2}\/\d{2}\/\d{4}$/) &&
        linea.match(/^\$\s*[\d,.]+$/)) {

      const tipo = anterior2.toUpperCase();
      const fecha = anterior1;
      const salario = parseFloat(linea.replace("$", "").replace(/,/g, ""));
      movimientos.push({ tipo, fecha, salario });
    }

    anterior2 = anterior1;
    anterior1 = linea;
  }

  if (patronActual) {
    periodos.push(...N1_procesarSISECDetallado(patronActual, movimientos, fechaBajaGeneral, vigente));
  }

  // Validación de estructura
  return periodos.filter(p => p && typeof p === "object" && p.alta && p.baja && p.salario);
}
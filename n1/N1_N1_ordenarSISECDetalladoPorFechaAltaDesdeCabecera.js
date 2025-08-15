/**
 * @description: Ordena la hoja "SISEC DETALLADO" de la calculadora por la columna de fecha de alta.
 * @note: La columna 3 corresponde a la fecha de alta.
 */
function N1_ordenarSISECDetalladoPorFechaAltaDesdeCabecera() {
  Logger.log("⏳ Ordenando datos en la hoja 'SISEC DETALLADO'...");

  try {
    const libro = SpreadsheetApp.getActiveSpreadsheet();
    const hojaCalculo = libro.getSheetByName("SISEC DETALLADO");

    if (!hojaCalculo) {
      Logger.log("❌ Hoja 'SISEC DETALLADO' no encontrada.");
      return;
    }

    // Ordenar el rango de datos (excluyendo la primera fila de encabezados)
    const ultimaFila = hojaCalculo.getLastRow();
    if (ultimaFila > 1) {
      const rangoDatos = hojaCalculo.getRange(2, 1, ultimaFila - 1, hojaCalculo.getLastColumn());
      rangoDatos.sort({ column: 3, ascending: true });
    }

    Logger.log("✅ Datos ordenados exitosamente por fecha de alta.");
  } catch (error) {
    Logger.log("❌ Error al ordenar la hoja: " + error.message);
  }
}
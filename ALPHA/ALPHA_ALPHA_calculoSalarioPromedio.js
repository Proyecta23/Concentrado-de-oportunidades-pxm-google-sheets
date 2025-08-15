/*************************************************************
 * Nivel ALPHA - Calculo de Salario Promedio desde SISEC
 *************************************************************/
function ALPHA_calculoSalarioPromedio() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = libro.getSheetByName("PV2");
  const fila = parseInt(hoja.getRange("B2").getValue(), 10);
  if (isNaN(fila) || fila <= 0) {
    Logger.log("❌ La celda B2 está vacía o no es un número válido.");
    return;
  }

  const cab = STAFF_utilidades_cabecerasProspeccionPV();

  const nombre = hoja.getRange(fila, cab["APELLIDOS DEL CLIENTE"].indice).getValue() + " " + hoja.getRange(fila, cab["NOMBRE(S) DEL CLIENTE"].indice).getValue();
  const nss = hoja.getRange(fila, cab["NSS"].indice).getValue();
  const curp = hoja.getRange(fila, cab["CURP"].indice).getValue();
  const linkSISEC = hoja.getRange(fila, cab["SISEC"].indice).getValue();

  let celdaCalculadora = hoja.getRange(fila, cab["CALCULADORA DE SERVICIO CLIENTE"].indice);
  let linkCalculadora = STAFF_utilidades_extraerLinkDeCelda(celdaCalculadora);

  Logger.log("📌 Link SISEC: " + linkSISEC);
  Logger.log("📌 Link Calculadora: " + linkCalculadora);

  if (!linkCalculadora || !linkCalculadora.startsWith("http")) {
    Logger.log("❌ Link de calculadora inválido: " + linkCalculadora);
    return;
  }

  if (!linkSISEC || !linkCalculadora) {
    Logger.log("❌ No se encontró el link del SISEC o de la calculadora.");
    return;
  }

  const periodos = N1_procesarDocumentoSISec(linkSISEC);
  if (!periodos || periodos.length === 0) {
    Logger.log("⚠️ No se encontraron periodos en el documento SISEC.");
    return;
  }

  // Vaciar los datos en la hoja SISEC DETALLADO
  N1_vaciarDatosEnCalculadora(linkCalculadora, periodos);

  // Ordenar hoja de calculadora por fecha
  N1_ordenarSISECDetalladoPorFechaAltaDesdeCabecera();

  // Hacer el análisis general
  const datosExtraidos = { nombre, nss, curp };
  const resultado = N1_analizarDatosGeneralesSISEC(datosExtraidos, periodos);

  // Escribir resumen en hoja calculadora
  const calculadora = SpreadsheetApp.openByUrl(linkCalculadora);
  const hojaCalculo = calculadora.getSheetByName("SISEC DETALLADO");

  let filaInicio = 1;
  hojaCalculo.getRange("F" + filaInicio).setValue("📋 Análisis del SISEC");
  filaInicio++;

  const resumen = resultado.resumen;
  for (let clave in resumen) {
    hojaCalculo.getRange("F" + filaInicio).setValue(clave);
    hojaCalculo.getRange("G" + filaInicio).setValue(resumen[clave]);
    filaInicio++;
  }

  // Escribir GAPS en columnas I y J
  const gaps = resultado.gapsDetalle;
  if (gaps.length > 0) {
    hojaCalculo.getRange("F" + filaInicio).setValue("🧩 Gaps de cotización detectados:");
    gaps.forEach((gap, index) => {
      hojaCalculo.getRange("I" + (filaInicio + index)).setValue(N1_formatearFecha(gap.inicio));
      hojaCalculo.getRange("J" + (filaInicio + index)).setValue(N1_formatearFecha(gap.fin));
    });
  }

  Logger.log("✅ Análisis de salario promedio finalizado para fila: " + fila);

  // 📌 NOTA: Aquí puedes incluir la futura estrategia con semáforos
  // const estrategia = ALPHA_generarEstrategiaYSemaforo(datosExtraidos, periodos);
  // hojaCalculo.getRange("K2").setValue(estrategia.riesgo);
}
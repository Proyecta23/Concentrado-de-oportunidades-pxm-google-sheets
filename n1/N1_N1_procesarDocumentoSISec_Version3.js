/**
 * Procesa el documento SISEC: detecta tipo, extrae periodos y genera resumen.
 * Nivel N1
 */
function N1_procesarDocumentoSISec(linkDocumento, datosCliente) {
  Logger.log("📂 Intentando abrir Documento Google Docs: " + linkDocumento);

  let previewText = "";
  try {
    const match = linkDocumento.match(/[-\w]{25,}/);
    if (!match) {
      Logger.log("❌ No se pudo extraer un ID válido del link.");
      return { resumen: {}, gapsDetalle: [], periodos: [] };
    }

    const doc = DocumentApp.openById(match[0]);
    const body = doc.getBody();
    const text = body.getText();
    previewText = text.split("\n").slice(0, 150).join("\n");
    Logger.log("📜 Primeras 150 líneas:\n" + previewText);
  } catch (error) {
    Logger.log("❌ Error al abrir o leer el documento: " + error.message);
    return { resumen: {}, gapsDetalle: [], periodos: [] };
  }

  // Detectar tipo de SISEC
  const tipo = N1_detectarTipoSISEC(previewText);
  Logger.log("📌 Tipo de SISEC detectado: " + tipo);

  let periodos = [];
  if (tipo === "SISEC GENERAL") {
    periodos = N1_extraerDatosSISECGeneral(previewText);
  } else if (tipo === "SISEC DETALLADO") {
    periodos = N1_extraerDatosSISECDetallado(previewText);
  } else {
    Logger.log("⚠️ No se pudo determinar el tipo de SISEC.");
    return { resumen: {}, gapsDetalle: [], periodos: [] };
  }

  Logger.log("📌 Periodos extraídos: " + JSON.stringify(periodos));

  // Generar resumen de análisis
  const resultado = N1_analizarDatosGeneralesSISEC(datosCliente, periodos);
  return {
    resumen: resultado.resumen,
    gapsDetalle: resultado.gapsDetalle,
    periodos: periodos
  };
}
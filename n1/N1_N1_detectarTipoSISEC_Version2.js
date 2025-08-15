/**
 * Detecta el tipo de SISEC en el texto.
 * Nivel N1
 */
function N1_detectarTipoSISEC(texto) {
  const t = texto.toLowerCase();
  if (t.includes("fecha de alta") && t.includes("fecha de baja") && !t.includes("tipo de movimiento")) {
    Logger.log("📌 Detectado SISEC GENERAL");
    return "SISEC GENERAL";
  }
  if (t.includes("tipo de movimiento") && t.includes("fecha de movimiento") && t.includes("salario base")) {
    Logger.log("📌 Detectado SISEC DETALLADO");
    return "SISEC DETALLADO";
  }
  Logger.log("⚠️ No se pudo detectar el tipo de SISEC");
  return "DESCONOCIDO";
}
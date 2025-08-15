/**
 * Extrae los periodos de cotización del SISEC GENERAL.
 * Nivel N1
 */
function N1_extraerDatosSISECGeneral(texto) {
  Logger.log("📄 Iniciando análisis de SISEC GENERAL...");

  const lineas = texto.split("\n");
  const periodos = [];

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();

    if (linea === "Nombre del patrón") {
      const patron = lineas[i + 1]?.trim();
      const alta = lineas[i + 3]?.trim();   // asumiendo formato específico
      const baja = lineas[i + 5]?.trim();
      const salarioRaw = lineas[i + 7]?.trim();

      const salario = salarioRaw ? parseFloat(salarioRaw.replace("$", "").replace(/,/g, "")) : null;

      if (patron && alta && baja && salario) {
        periodos.push({
          patron,
          alta,
          baja: baja.toUpperCase() === "VIGENTE" ? N1_obtenerUltimoDiaMes() : baja,
          salario,
          detallado: false
        });
      }
    }
  }

  return periodos;
}
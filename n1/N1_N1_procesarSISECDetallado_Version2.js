/**
 * Procesa los periodos de cotización de un patrón individual del SISEC DETALLADO.
 * Nivel N1
 */
function N1_procesarSISECDetallado(patron, movimientos, baja, vigente) {
  const periodos = [];
  let fechaBaja = baja;

  if (!fechaBaja) {
    const movimientoBaja = movimientos.find(m => m.tipo === "BAJA");
    if (movimientoBaja) fechaBaja = movimientoBaja.fecha;
  }

  const movimientosValidos = movimientos.filter(m => m.tipo !== "BAJA");

  if (movimientosValidos.length === 0) return [];

  for (let i = 0; i < movimientosValidos.length; i++) {
    const alta = (i === 0) ? movimientosValidos[i].fecha : N1_restarUnDia(N1_parseFecha(movimientosValidos[i - 1].fecha));
    const bajaPeriodo = (i === 0) ? fechaBaja : N1_restarUnDia(N1_parseFecha(movimientosValidos[i - 1].fecha));
    const salario = movimientosValidos[i].salario;

    periodos.push({
      patron: i === 0 ? patron : "",
      alta: alta,
      baja: bajaPeriodo,
      salario: salario,
      detallado: true
    });
  }

  return periodos;
}
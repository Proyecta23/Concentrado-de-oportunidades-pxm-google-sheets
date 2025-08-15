/**
 * Analiza los periodos de cotización y genera resumen y gaps.
 * Nivel N1
 */
function N1_analizarDatosGeneralesSISEC(datosCliente, periodos) {
  const info = {};

  const subNum = datosCliente.nss?.substring(0, 2);
  const subdelegacion = STAFF_utilidades_buscarSubdelegacion(subNum);
  info["🏢 Subdelegación"] = `[${subNum}] ${subdelegacion?.subdelegacion || 'Desconocida'}`;
  info["Dirección de subdelegación"] = subdelegacion?.direccion || 'No disponible';

  const añoNacimiento = parseInt(datosCliente.curp?.substring(4, 6));
  const siglo = parseInt(datosCliente.curp?.substring(16, 17)) <= 9 ? 2000 : 1900;
  const nacimiento = siglo + añoNacimiento;
  info["📅 Año de nacimiento"] = nacimiento;

  const afiliacion = parseInt(datosCliente.nss?.substring(2, 4)) + 1900;
  info["🆔 Año de afiliación"] = afiliacion;

  const edadAfiliacion = afiliacion - nacimiento;
  info["⏳ Edad de afiliación"] = edadAfiliacion;
  info["⚠️ Inconsistencia: Edad de afiliación"] = edadAfiliacion >= 15 ? "✅ Consistente" : "❌ Menor de 15";

  const ley73 = periodos.find(p => new Date(p.alta.split("/").reverse().join("-")) < new Date("1997-07-01"));
  if (ley73) {
    info["💼 Patrón Ley 73"] = `${ley73.patron} (${ley73.alta})`;
  }

  const salarios = periodos.map(p => p.salario);
  const ultimos5 = periodos.filter(p => new Date(p.alta.split("/").reverse().join("-")) >= N1_restarAnios(new Date(), 5)).map(p => p.salario);
  info["💵 Salario promedio histórico"] = N1_promedio(salarios);
  info["💵 Salario promedio últimos 5 años"] = N1_promedio(ultimos5);

  const vigente = periodos.find(p => p.baja === "VIGENTE");
  if (vigente) {
    info["📅 Patrón activo"] = vigente.patron;
    info["📅 Alta vigente"] = vigente.alta;
  }

  const cumple60 = new Date(nacimiento + 60, new Date().getMonth(), new Date().getDate());
  info["🎂 Cumple 60 años"] = N1_formatearFecha(cumple60);

  const gaps = STAFF_utilidades_calcularGapsCotizacion(periodos);
  info["🧩 Gaps de cotización (>1 año)"] = gaps.map(g => `${g.inicio.getFullYear()} - ${g.fin.getFullYear()}`).join(", ");

  if (!vigente && periodos.length > 0) {
    const ultima = periodos[0];
    const baja = N1_parseFecha(ultima.baja);
    const hoy = new Date();
    const meses = (hoy.getFullYear() - baja.getFullYear()) * 12 + (hoy.getMonth() - baja.getMonth());
    info["⏰ Meses sin ejercer derecho"] = `${meses} meses`;
  }

  return { resumen: info, gapsDetalle: gaps };
}
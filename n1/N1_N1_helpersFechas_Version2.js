function N1_obtenerUltimoDiaMes() {
  let hoy = new Date();
  let ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
  return Utilities.formatDate(ultimoDia, Session.getScriptTimeZone(), "dd/MM/yyyy");
}

function N1_restarUnDia(fecha) {
  let partes = fecha.split("/");
  let dateObj = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
  dateObj.setDate(dateObj.getDate() - 1);
  let dia = ("0" + dateObj.getDate()).slice(-2);
  let mes = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let anio = dateObj.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function N1_formatearFecha(fecha) {
  // Si recibe un string dd/mm/yyyy lo deja igual, si es objeto Date lo formatea
  if (typeof fecha === "string") return fecha;
  return Utilities.formatDate(fecha, Session.getScriptTimeZone(), "dd/MM/yyyy");
}

function N1_parseFecha(fechaStr) {
  // dd/mm/yyyy a Date
  let partes = fechaStr.split("/");
  return new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
}

function N1_restarAnios(fecha, numAnios) {
  let nueva = new Date(fecha.getTime());
  nueva.setFullYear(nueva.getFullYear() - numAnios);
  return nueva;
}

function N1_promedio(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
/**
 * Helpers de fechas para SISEC y cálculo de periodos.
 * Nivel N1
 */
function N1_restarUnDia(fecha) {
  let partes = fecha.split("/");
  let dateObj = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
  dateObj.setDate(dateObj.getDate() - 1);

  let dia = ("0" + dateObj.getDate()).slice(-2);
  let mes = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let anio = dateObj.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

function N1_obtenerUltimoDiaMes() {
  let hoy = new Date();
  let ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
  return Utilities.formatDate(ultimoDia, Session.getScriptTimeZone(), "dd/MM/yyyy");
}
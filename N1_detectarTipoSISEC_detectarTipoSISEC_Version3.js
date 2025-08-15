function detectarTipoSISEC(texto) {
    Logger.log("📌 Analizando el tipo de SISEC en el documento...");

    let textoMinusculas = texto.toLowerCase();

    if (
        textoMinusculas.includes("fecha de alta") &&
        textoMinusculas.includes("fecha de baja") &&
        !textoMinusculas.includes("tipo de movimiento")
    ) {
        Logger.log("📌 Tipo de SISEC detectado: SISEC GENERAL");
        return "SISEC GENERAL";
    }

    if (
        textoMinusculas.includes("tipo de movimiento") &&
        textoMinusculas.includes("fecha de movimiento") &&
        textoMinusculas.includes("salario base")
    ) {
        Logger.log("📌 Tipo de SISEC detectado: SISEC DETALLADO");
        return "SISEC DETALLADO";
    }

    Logger.log("⚠️ No se pudo determinar el tipo de SISEC.");
    return "DESCONOCIDO";
}
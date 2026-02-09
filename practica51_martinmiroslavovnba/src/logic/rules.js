// src/rules.js

/**
 * Calcula el nuevo marcador sumando los puntos a la puntuación actual.
 * @param {number} puntajeActual - Los puntos que ya tiene el equipo.
 * @param {number} puntosASumar - La canasta anotada (2 o 3).
 * @returns {number} - El nuevo total de puntos.
 */
export const calcularNuevoMarcador = (puntajeActual, puntosASumar) => {
  return puntajeActual + puntosASumar;
};
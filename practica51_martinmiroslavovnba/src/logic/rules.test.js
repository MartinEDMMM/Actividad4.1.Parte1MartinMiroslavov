// src/rules.test.js
import { calcularNuevoMarcador } from './rules';

describe('Pruebas de Lógica de Puntuación - Árbitro Digital', () => {

  test('Escenario A: Si tengo 10 puntos y anoto una canasta de 2, el resultado debe ser 12', () => {
    // Preparación
    const inicial = 10;
    const canasta = 2;
    
    // Ejecución
    const resultado = calcularNuevoMarcador(inicial, canasta);
    
    // Verificación
    expect(resultado).toBe(12);
  });

  test('Escenario B: Si tengo 10 puntos y anoto un triple (3), el resultado debe ser 13', () => {
    // Ejecución y Verificación directa
    expect(calcularNuevoMarcador(10, 3)).toBe(13);
  });

});
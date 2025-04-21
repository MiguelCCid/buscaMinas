import React, { useState } from "react";
import Casilla from "./Casilla";

// Función para generar el tablero
const generarTablero = (filas, columnas, bombas) => {
  // Crear la matriz vacía
  const tablero = Array(filas).fill().map(() => Array(columnas).fill(0));

  // Colocar las bombas aleatoriamente
  let bombasTablero = 0;
  while (bombasTablero < bombas) {
    const fila = Math.floor(Math.random() * filas);
    const columna = Math.floor(Math.random() * columnas);

    // Asegurarse de que no haya bomba ya en esa posición
    if (tablero[fila][columna] !== 'bomba') {
      tablero[fila][columna] = 'bomba';
      bombasTablero++;

      // Actualizar las casillas alrededor de la bomba
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nuevaFila = fila + i;
          const nuevaColumna = columna + j;
          if (
            nuevaFila >= 0 && nuevaFila < filas &&
            nuevaColumna >= 0 && nuevaColumna < columnas &&
            tablero[nuevaFila][nuevaColumna] !== 'bomba'
          ) {
            tablero[nuevaFila][nuevaColumna]++;
          }
        }
      }
    }
  }

  return tablero;
};

const Tablero = () => {
  const tamano = 8; // Tamaño del tablero
  const totalBombas = 10; // Número de bombas que queremos en el tablero
  
  // Crear el estado del tablero
  const [tablero, setTablero] = useState(() =>
    generarTablero(tamano, tamano, totalBombas)
  );

  const tabla = [];

  // Crear las filas y columnas para renderizar las casillas
  for (let fila = 0; fila < tamano; fila++) {
    const casillaFilas = [];
    for (let columna = 0; columna < tamano; columna++) {
      casillaFilas.push(
        <Casilla
          key={`${fila}-${columna}`}
          fila={fila}
          columna={columna}
          valor={tablero[fila][columna]} // Pasamos el valor real de la casilla
        />
      );
    }
    tabla.push(
      <div key={fila} style={{ display: "flex" }}>
        {casillaFilas}
      </div>
    );
  }

  return <div>{tabla}</div>;
};

export default Tablero;

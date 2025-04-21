import React, { useState } from "react";
import Casilla from "./Casilla";

const generarTablero = (filas, columnas, bombas) => {
  const tablero = Array(filas).fill().map(() => Array(columnas).fill(0));

  let bombasTablero = 0;
  while (bombasTablero < bombas) {
    const fila = Math.floor(Math.random() * filas);
    const columna = Math.floor(Math.random() * columnas);

    if (tablero[fila][columna] !== 'bomba') {
      tablero[fila][columna] = 'bomba';
      bombasTablero++;

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
  const tamano = 8; 
  const totalBombas = 10; 
  
  // Crear el estado del tablero
  const [tablero, setTablero] = useState(() =>
    generarTablero(tamano, tamano, totalBombas)
  );

  const tabla = [];

  for (let fila = 0; fila < tamano; fila++) {
    const casillaFilas = [];
    for (let columna = 0; columna < tamano; columna++) {
      casillaFilas.push(
        <Casilla
          key={`${fila}-${columna}`}
          fila={fila}
          columna={columna}
          valor={tablero[fila][columna]} 
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

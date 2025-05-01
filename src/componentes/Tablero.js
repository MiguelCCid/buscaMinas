import React, { useState } from "react";
import Casilla from "./Casilla";

const generarTablero = (filas, columnas, bombas) => {
  const tablero = Array(filas).fill().map(() =>
    Array(columnas).fill().map(() => ({
      valor: 0,
      descubierta: false,
      marcada: false,
    }))
  );

  let bombasTablero = 0;
  while (bombasTablero < bombas) {
    const fila = Math.floor(Math.random() * filas);
    const columna = Math.floor(Math.random() * columnas);

    if (tablero[fila][columna].valor !== "bomba") {
      tablero[fila][columna].valor = "bomba";
      bombasTablero++;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nuevaFila = fila + i;
          const nuevaColumna = columna + j;
          if (
            nuevaFila >= 0 &&
            nuevaFila < filas &&
            nuevaColumna >= 0 &&
            nuevaColumna < columnas &&
            tablero[nuevaFila][nuevaColumna].valor !== "bomba"
          ) {
            tablero[nuevaFila][nuevaColumna].valor += 1;
          }
        }
      }
    }
  }

  return tablero;
};

const Tablero = () => {
  const tamano = 8;
  const totalBombas = 5;

  const [tablero, setTablero] = useState(() =>
    generarTablero(tamano, tamano, totalBombas)
  );
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const descubrirCasilla = (fila, columna) => {
    if (juegoTerminado) return;

    const nuevoTablero = tablero.map((fila) =>
      fila.map((casilla) => ({ ...casilla }))
    );

    const casilla = nuevoTablero[fila][columna];
    if (casilla.descubierta || casilla.marcada) return;

    if (casilla.valor === "bomba") {
      casilla.descubierta = true;
      setTablero(nuevoTablero);
      setJuegoTerminado(true);
      setMensaje("¡Perdiste!");
      return;
    }

    const descubrirRecursivo = (f, c) => {
      const casilla = nuevoTablero[f][c];
      if (casilla.descubierta || casilla.marcada) return;

      casilla.descubierta = true;

      if (casilla.valor === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nuevaFila = f + i;
            const nuevaColumna = c + j;
            if (
              nuevaFila >= 0 &&
              nuevaFila < tamano &&
              nuevaColumna >= 0 &&
              nuevaColumna < tamano
            ) {
              descubrirRecursivo(nuevaFila, nuevaColumna);
            }
          }
        }
      }
    };

    descubrirRecursivo(fila, columna);
    setTablero(nuevoTablero);
  };

  const marcarCasilla = (fila, columna) => {
    if (juegoTerminado) return;

    const nuevoTablero = tablero.map((fila) =>
      fila.map((casilla) => ({ ...casilla }))
    );

    const casilla = nuevoTablero[fila][columna];
    if (!casilla.descubierta) {
      casilla.marcada = !casilla.marcada;
    }

    setTablero(nuevoTablero);
  };

  const tabla = [];

  for (let fila = 0; fila < tamano; fila++) {
    const casillaFilas = [];
    for (let columna = 0; columna < tamano; columna++) {
      const { valor, descubierta, marcada } = tablero[fila][columna];
      casillaFilas.push(
        <Casilla
          key={`${fila}-${columna}`}
          fila={fila}
          columna={columna}
          valor={valor}
          descubierta={descubierta}
          marcada={marcada}
          onDescubrir={descubrirCasilla}
          onMarcar={marcarCasilla}
        />
      );
    }
    tabla.push(
      <div key={fila} style={{ display: "flex" }}>
        {casillaFilas}
      </div>
    );
  }

  return (
    <div>
      {tabla}
      {mensaje && <h2 style={{ marginTop: '20px' }}>{mensaje}</h2>}
    </div>
  );
};

export default Tablero;

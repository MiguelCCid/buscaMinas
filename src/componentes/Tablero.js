import React, { useState } from "react";
import Casilla from "./Casilla";
import { useEffect } from "react";
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
  const [bombasRestantes, setBombasRestantes] = useState(totalBombas); 
  const [tiempo, setTiempo] =useState(0)
  
  const [tablero, setTablero] = useState(() =>
    generarTablero(tamano, tamano, totalBombas)
  );
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  
  useEffect(() => {
    if (juegoTerminado) return;
  
    const intervalo = setInterval(() => {
      setTiempo(t => t + 1);
    }, 1000);
  
    return () => clearInterval(intervalo);
  }, [juegoTerminado]);



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
      setMensaje("¡Perdiste 💣! se reiniciará en: 5 segundos");
      setTimeout(reiniciarJuego, 5000);
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
  
    let haGanado = true;
    for (let i = 0; i < tamano; i++) {
      for (let j = 0; j < tamano; j++) {
        const c = nuevoTablero[i][j];
        if (c.valor !== "bomba" && !c.descubierta) {
          haGanado = false;
          break;
        }
      }
    }
  
    if (haGanado) {
      setJuegoTerminado(true);
        setMensaje(`¡Ganaste! 🎉 se reiniciará en: 5 segundos`);
        setTimeout(reiniciarJuego, 5000);
    }

  
    setTablero(nuevoTablero);
  };
  
  
  const marcarCasilla = (fila, columna) => {
    if (juegoTerminado) return;

    const nuevoTablero = tablero.map((fila) =>
      fila.map((casilla) => ({ ...casilla }))
    );

    const casilla = nuevoTablero[fila][columna];
    if (!casilla.descubierta && casilla.marcada === false) {
      casilla.marcada = true;
      setBombasRestantes(bombas => bombas - 1);
    } else if (!casilla.descubierta && casilla.marcada === true) {
      casilla.marcada = false;
      setBombasRestantes(bombas => bombas + 1);

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

  const reiniciarJuego = () => {
    setTablero(generarTablero(tamano, tamano, totalBombas));
    setBombasRestantes(totalBombas);
    setJuegoTerminado(false);
    setMensaje("");
    setTiempo(0);
  };

  return (
    <div>
      <div>Tiempo jugado: {tiempo} </div>
      <div>Bombas restantes: {bombasRestantes} </div>
      {tabla}
      {mensaje && <h2 style={{ marginTop: '20px' }}>{mensaje}</h2>}
    </div>
  );
};



export default Tablero;

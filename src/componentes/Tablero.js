import React from "react";
import Casilla from "./Casilla"

const Tablero = () => {
    const tamano = 8;
    const tabla =  [];

    for (let fila = 0; fila < tamano; fila++){
        const casillaFilas = [];
        for (let columna = 0; columna < tamano; columna++){
            casillaFilas.push (
                <Casilla key={`${fila}-${columna}`} fila={fila} columna={columna}></Casilla>
            );
        }
        tabla.push(
            <div key={fila} style={{display: 'flex'}}>
                {casillaFilas}
            </div>
        );
    }

    return (
    <div>{tabla}</div>
    );
};
export default Tablero;
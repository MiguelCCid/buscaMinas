import React, { useState } from 'react';

const Casilla = ({ fila, columna, valor }) => {
    const [descubierta, setDescubierta] = useState(false);
    const [marcada, setMarcada] = useState(false);

    const handleClickIzq = () => { 
        if(!marcada){
        setDescubierta(true);
        }
      };
    const handleClickDer = (e) =>{
        e.preventDefault();
        if (!descubierta){
            setMarcada(!marcada);
        }
    };

    let contenido ="";
    if (descubierta){
        if(valor === "bomba"){
            contenido="bomba";
        } else if (valor ===0){
            contenido="0";
        } else {
            contenido = valor
        }
    } else if (marcada) {
        contenido="bandera";
    }
  return (
    <button
      onClick={handleClickIzq}
      onContextMenu={handleClickDer}
      style={{
        width: '40px',
        height: '40px',
        margin: '2px',
        fontSize: '16px',
        cursor: 'pointer'
      }}
    >
        {contenido}
    </button>
  );
};

export default Casilla;

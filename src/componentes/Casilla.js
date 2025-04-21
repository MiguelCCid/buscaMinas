import React, { useState } from 'react';

const Casilla = ({ fila, columna, valor }) => {
    const [descubierta, setDescubierta] = useState(false);

    const handleClick = () => { 
        setDescubierta(true);
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
    }
  return (
    <button
      onClick={handleClick}
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

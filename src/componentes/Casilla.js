import React from 'react';

const Casilla = ({ fila, columna, valor, descubierta, marcada, onDescubrir, onMarcar }) => {
  const handleClickIzq = () => {
    if (!marcada) {
      onDescubrir(fila, columna);
    }
  };

  const handleClickDer = (e) => {
    e.preventDefault();
    if (!descubierta) {
      onMarcar(fila, columna);
    }
  };

  let contenido = "";
  if (descubierta) {
    if (valor === "bomba") {
      contenido = "bomba";
    } else if (valor === 0) {
      contenido = "0";
    } else {
      contenido = valor;
    }
  } else if (marcada) {
    contenido = "bandera";
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
        cursor: 'pointer',
        backgroundColor: descubierta ? '#ddd' : '#aaa',
        border: '1px solid #555'
      }}
    >
      {contenido}
    </button>
  );
};

export default Casilla;

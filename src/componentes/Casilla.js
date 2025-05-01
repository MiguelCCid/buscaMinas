import React from 'react';

const Casilla = ({
  fila,
  columna,
  valor,
  descubierta,
  marcada,
  onDescubrir,
  onMarcar
}) => {
  const handleClickIzq = () => {
    onDescubrir(fila, columna);
  };

  const handleClickDer = (e) => {
    e.preventDefault();
    onMarcar(fila, columna);
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
        backgroundColor: descubierta ? '#ddd' : '#999',
      }}
    >
      {contenido}
    </button>
  );
};

export default Casilla;

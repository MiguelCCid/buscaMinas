import React from 'react';

const Casilla = ({ fila, columna }) => {
    const handleClick = () => { //creamos
      };

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
    </button>
  );
};

export default Casilla;

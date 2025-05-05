import { render, screen, fireEvent } from '@testing-library/react';
import Tablero from './Tablero';


test('renderiza un tablero de 8x8', () => {
  render(<Tablero />);
  const botones = screen.getAllByRole('button');
  expect(botones.length).toBe(64); 
});

test('puede marcar una casilla con bandera', () => {
  render(<Tablero />);
  const botones = screen.getAllByRole('button');
  fireEvent.contextMenu(botones[0]); 
  expect(botones[0].textContent).toBe('bandera');
});

test('descubre una casilla con clic izquierdo', () => {
  render(<Tablero />);
  const botones = screen.getAllByRole('button');
  fireEvent.click(botones[1]); 
  expect(botones[1].textContent).not.toBe('');
});



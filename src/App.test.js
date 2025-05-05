import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza el título del juego', () => {
  render(<App />);
  const titulo = screen.getByText(/buscaminas/i);
  expect(titulo).toBeInTheDocument();
});

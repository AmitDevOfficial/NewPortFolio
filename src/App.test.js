import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero heading', () => {
  render(<App />);
  const nameElements = screen.getAllByText(/Amit Vishwakarma/i);
  expect(nameElements.length).toBeGreaterThan(0);
});

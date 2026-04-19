import { render, screen } from '@testing-library/react';
import App from './App';

test('renders deron overview content', () => {
  render(<App />);
  expect(screen.getByText(/Mission-grade drone infrastructure/i)).toBeInTheDocument();
});

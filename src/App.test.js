import { render, screen } from '@testing-library/react';
import App from './App';

test('renders download cta', () => {
  render(<App />);
  expect(screen.getAllByText(/DACTS/i)[0]).toBeInTheDocument();
});

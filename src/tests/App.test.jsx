import { render, screen } from '@testing-library/react';
import { test, expect } from "@jest/globals";
import App from '../App';

test("renders Vite + React heading", () => {
  render(<App />);
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});
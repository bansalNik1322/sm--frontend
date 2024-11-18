import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register'; // Adjust the import based on your file structure

test('renders register form and submits data', () => {
  render(Register);

  // Check if the form elements are present
  const usernameInput = screen.getByLabelText(/username/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /register/i });

  // Simulate user input
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Simulate form submission
  fireEvent.click(submitButton);

  // Assertions to check if the form submission was successful
  expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
});
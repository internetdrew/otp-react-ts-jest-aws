import userEvent from '@testing-library/user-event';
import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Renders our OTP component', () => {
    render(<App />);
    expect(screen.getByText('Verify your email address')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Please enter the 6-digit code we sent to your email address.'
      )
    ).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(6);
    expect(screen.getByRole('button', { name: /confirm/i }));
  });

  it('Renders an error message when inputs are incomplete', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    screen.debug();
    expect(
      screen.getByText('All fields are required for submission.')
    ).toBeInTheDocument();
  });
});

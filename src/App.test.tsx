import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import toast from 'react-hot-toast';

type ToastType = typeof import('react-hot-toast');

vi.mock('react-hot-toast', async importOriginal => {
  const actual: ToastType = await importOriginal();
  return {
    ...actual,
    Toaster: vi.fn().mockImplementation(() => {
      return <div>Mocked Toaster</div>;
    }),
  };
});
const toastSuccess = vi.spyOn(toast, 'success');

describe('App', () => {
  it('Renders our OTP component in our app', () => {
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
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it('Renders an error message when no inputs have been filled', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(
      screen.getByText('All fields are required for submission.')
    ).toBeInTheDocument();
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it('Disregards inputs that are not numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'e');
    await user.type(inputs[1], '#');
    await user.type(inputs[2], 'g');
    expect(inputs[0]).toBeEmptyDOMElement();
    expect(inputs[1]).toBeEmptyDOMElement();
    expect(inputs[2]).toBeEmptyDOMElement();
    await user.type(inputs[0], '9');
    expect(inputs[0]).toHaveValue('9');
  });

  it('Renders an error message when inputs are only partially filled', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '3');
    await user.type(inputs[1], '6');
    await user.type(inputs[2], '9');
    expect(inputs[0]).toHaveValue('3');
    expect(inputs[1]).toHaveValue('6');
    expect(inputs[2]).toHaveValue('9');
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(
      screen.getByText('All fields are required for submission.')
    ).toBeInTheDocument();
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it('Automatically resolves the error message when the inputs are completely filled', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '3');
    await user.type(inputs[1], '6');
    await user.type(inputs[2], '9');
    expect(inputs[0]).toHaveValue('3');
    expect(inputs[1]).toHaveValue('6');
    expect(inputs[2]).toHaveValue('9');
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(
      screen.getByText('All fields are required for submission.')
    ).toBeInTheDocument();
    await user.type(inputs[3], '2');
    await user.type(inputs[4], '4');
    await user.type(inputs[5], '6');
    expect(inputs[3]).toHaveValue('2');
    expect(inputs[4]).toHaveValue('4');
    expect(inputs[5]).toHaveValue('6');
    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
  });
  it('Successfully triggers onSubmit function with valid input', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], '3');
    await user.type(inputs[1], '6');
    await user.type(inputs[2], '9');
    await user.type(inputs[3], '2');
    await user.type(inputs[4], '4');
    await user.type(inputs[5], '6');
    expect(inputs[0]).toHaveValue('3');
    expect(inputs[1]).toHaveValue('6');
    expect(inputs[2]).toHaveValue('9');
    expect(inputs[3]).toHaveValue('2');
    expect(inputs[4]).toHaveValue('4');
    expect(inputs[5]).toHaveValue('6');

    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(
      screen.queryByText('All fields are required for submission.')
    ).not.toBeInTheDocument();
    expect(toastSuccess).toBeCalledWith('Entered code: 369246');
    expect(inputs[0]).toBeEmptyDOMElement();
    expect(inputs[1]).toBeEmptyDOMElement();
    expect(inputs[2]).toBeEmptyDOMElement();
    expect(inputs[3]).toBeEmptyDOMElement();
    expect(inputs[4]).toBeEmptyDOMElement();
    expect(inputs[5]).toBeEmptyDOMElement();
  });
});

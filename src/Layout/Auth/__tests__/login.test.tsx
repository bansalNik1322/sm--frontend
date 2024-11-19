import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { useLoading, useRequest } from '../../../components/App';
import { toastr } from '../../../utils/helpers';
import Login from '../Login/index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../components/App', () => ({
  useRequest: jest.fn(),
  useLoading: jest.fn(),
}));

jest.mock('../../../utils/helpers', () => ({
  toastr: jest.fn(),
  validateAuthentication: jest.fn(),
}));

describe('Login Component Tests', () => {
  const requestMock = jest.fn();
  const pushMock = jest.fn();
  const ButtonLoaderMock = jest.fn(() => <span>Loading...</span>);

  beforeEach(() => {
    (useRequest as jest.Mock).mockReturnValue({
      request: requestMock,
      loading: false,
    });
    (useLoading as jest.Mock).mockReturnValue({
      ButtonLoader: ButtonLoaderMock,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    (toastr as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Login component', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

  test('should show error message for empty email and password fields', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '' },
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Required');
      console.log('🚀 ~ awaitwaitFor ~ errorMessages:', errorMessages.length);

      expect(errorMessages).toHaveLength(2);
    });
  });

  test('should show error message for invalid email format', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'invalid-email' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailErrorMessage = screen.getByText('Required');
      console.log('Email Error:', emailErrorMessage.textContent);

      expect(emailErrorMessage).toBeInTheDocument();
    });
  });

  test('should show password length error message', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const passwordErrorMessage = screen.getByText('Too Short!');
      console.log('Password Error:', passwordErrorMessage.textContent);

      expect(passwordErrorMessage).toBeInTheDocument();
    });
  });

  it('calls request API and navigates on successful login', async () => {
    requestMock.mockResolvedValue({
      data: {
        authTokens: {
          accessToken: 'fakeAccessToken',
          refreshToken: 'fakeRefreshToken',
        },
      },
      status: true,
      message: 'Login successful',
    });

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email or Username/i), { target: { value: 'silent_knight' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(requestMock).toHaveBeenCalledWith('LoginUser', {
        userid: 'silent_knight',
        email: 'silent_knight',
        password: '123456',
        rememberme: false,
      });
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error message on failed login', async () => {
    const failureResponse = {
      status: false,
      message: 'Login Failed',
    };

    const requestMock = jest.fn().mockResolvedValue(failureResponse);

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email or Username/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      //   expect(screen.getByText(/Login Failed/i)).toBeInTheDocument();

      expect(toastr).toHaveBeenCalledWith('Login Failed', 'error', 'Login');
    });

    expect(requestMock).toHaveBeenCalledWith('LoginUser', {
      email: 'test@example.com',
      password: 'wrongpassword',
      userid: 'test@example.com',
      rememberme: false,
    });
  });
});

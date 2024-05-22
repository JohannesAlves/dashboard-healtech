import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByText,
  getAllByText,
} from '@testing-library/react';
import Login from '.';
import { AuthProvider, AuthContext } from '@/context/auth-context';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: () => null,
    };
  },
}));

describe('<Login />', () => {
  it('renders login form correctly', () => {
    const { getByLabelText, getByText } = render(<Login />);

    expect(getByText('LOGO')).toBeInTheDocument();
    expect(getByText('Bem-vindo(a)')).toBeInTheDocument();
    expect(
      getByText('Acesse sua conta para iniciar a sessão')
    ).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Senha')).toBeInTheDocument();
    expect(getByText('Esqueceu a sua senha?')).toBeInTheDocument();
    expect(getByText('Acessar plataforma')).toBeInTheDocument();
    expect(getByText('Acessar plataforma')).toBeInTheDocument();
  });

  it('should be call handleLogin when submit is fired', async () => {
    const mockHandleLogin = jest.fn();
    mockHandleLogin.mockReturnValue({ isSigned: false });

    const { getByRole, getByLabelText, getByText } = render(
      <AuthContext.Provider
        value={{ handleLogin: mockHandleLogin, user: { isSigned: false } }}
      >
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'teste@example.com' },
    });
    fireEvent.change(getByLabelText(/senha/i), {
      target: { value: 'password' },
    });

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: /acessar plataforma/i }));
      expect(mockHandleLogin).toHaveBeenCalledTimes(1);
    });
  });

  it('should be return error messsage when email and password is wrong', async () => {
    const mockHandleLogin = jest.fn();
    mockHandleLogin.mockReturnValue({ isSigned: false });
    const mockUser = { isSigned: false };

    const { getByRole, getByLabelText, getByText } = render(
      <AuthContext.Provider
        value={{ handleLogin: mockHandleLogin, user: mockUser }}
      >
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(getByLabelText(/senha/i), {
      target: { value: 'wrongpassword' },
    });

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: /acessar plataforma/i }));
      const errorsMessage = screen.getAllByText('Email ou senha incorretos.');

      expect(errorsMessage.length).toBe(2);
    });
  });

  it('should be return signed true when user make the login correctly', async () => {
    const mockHandleLogin = jest.fn();
    mockHandleLogin.mockReturnValue({
      isSigned: true,
      email: 'teste@gmail.com',
      token: 'uuid',
    });
    const mockUser = {
      isSigned: true,
      email: 'teste@gmail.com',
      password: '1234',
    };

    const { getByRole, getByLabelText, getByText } = render(
      <AuthContext.Provider
        value={{ handleLogin: mockHandleLogin, user: mockUser }}
      >
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'teste@gmail.com' },
    });
    fireEvent.change(getByLabelText(/senha/i), {
      target: { value: '1234' },
    });

    await waitFor(() => {
      fireEvent.click(getByRole('button', { name: /acessar plataforma/i }));
      expect(mockUser.isSigned).toBe(true);
    });
  });
});

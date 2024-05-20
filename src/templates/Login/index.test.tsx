import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '.';
import { AuthProvider } from '@/context/auth-context';

describe('Login component', () => {
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
  });
});

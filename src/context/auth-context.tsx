'use client';
import { createContext, useState } from 'react';

type AuthContextProps = {
  children: React.ReactNode;
};

interface IUser {
  email?: string;
  isSigned: boolean;
  token?: string;
}

interface IAuthContext {
  handleLogin: (email: string, password: string) => IUser;
  user: IUser;
}

export const mockLoginData = {
  email: 'teste@email.com',
  password: '1234',
};

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<IUser>({} as IUser);

  const handleLogin = (email: string, password: string) => {
    if (email === mockLoginData.email && password === mockLoginData.password) {
      const authenticatedUser = {
        email: mockLoginData.email,
        isSigned: true,
        token: 'uuid',
      };

      return authenticatedUser;
    }

    return {
      isSigned: false,
    };
  };

  return (
    <AuthContext.Provider value={{ handleLogin, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

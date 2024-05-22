import {
  AuthContext,
  AuthProvider,
  mockLoginData,
} from '@/context/auth-context';
import { fireEvent, render } from '@testing-library/react';
import { useContext } from 'react';

describe('AuthContext', () => {
  it('should be return a signed false when wrong email is passed', () => {
    const result = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ handleLogin, user }) => (
            <div>
              <button
                onClick={() => handleLogin('wrongemail', 'wrongpassword')}
              >
                Login
              </button>
              <span data-testid="user">{user.email}</span>
            </div>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    fireEvent.click(result.getByText('Login'));

    expect(result.getByTestId('user').textContent).toBe('');
  });
});

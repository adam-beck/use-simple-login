import { buildAuthenticationContext, LoginCredentials } from '@adam-beck/use-simple-login';

interface User {
  username: string;
  token: string;
  role: string;
}

async function mockGetUser(credentials: LoginCredentials) {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({
        username: credentials.username,
        token: 'a1b2c3',
        role: 'admin',
      });
    }, 2000);
  });
}

const {
  AuthenticationProvider,
  useAuthentication,
} = buildAuthenticationContext({
  loginFn: mockGetUser,
});

export { AuthenticationProvider, useAuthentication };
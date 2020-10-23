import { buildAuthenticationContext, LoginCredentials } from './lib';

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
  login: mockGetUser,
});

export { AuthenticationProvider, useAuthentication };

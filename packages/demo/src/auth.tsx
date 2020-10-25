import {
  buildAuthenticationContext,
  LoginFunction,
} from '@adam-beck/use-simple-login';

interface User {
  username: string;
  token: string;
  role: string;
}

const loginFn: LoginFunction<User> = (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: credentials.username,
        token: 'abc123',
        role: 'admin',
      });
    }, 2000);
  });
};

const {
  AuthenticationProvider,
  useAuthentication,
} = buildAuthenticationContext({
  loginFn,
});

export { AuthenticationProvider, useAuthentication };

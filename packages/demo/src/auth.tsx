import {
  buildAuthenticationContext,
  LoginCredentials,
} from '@adam-beck/use-simple-login';
import { useEffect, useState } from 'react';

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

function AmsAuthenticationProvider({ children }: React.PropsWithChildren<{}>) {
  const [refreshTime, setRefreshTime] = useState(1000 * 60 * 5);

  useEffect(() => {
    //after refreshTime make a refresh request
    console.log('Current Time To Refresh', refreshTime);
  }, [refreshTime]);

  const onLogIn = (user: User) => {
    setRefreshTime(69);
  };

  return (
    <AuthenticationProvider value={{ onLogin: onLogIn }}>
      {children}
    </AuthenticationProvider>
  );
}

export { AmsAuthenticationProvider, useAuthentication };

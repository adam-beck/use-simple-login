import * as React from 'react';
import { useAuthentication } from './auth';

function Nested() {
  const { status, login, user } = useAuthentication();

  return (
    <div>
      <h2>Status: {status}</h2>

      <button
        onClick={() =>
          login({ username: 'brutus', password: 'averystrongpassword' })
        }
      >
        LOGIN
      </button>

      <br />

      {!!user && JSON.stringify(user)}
    </div>
  );
}

export { Nested };
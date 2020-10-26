import './App.css';

import React from 'react';

import { AuthenticationProvider } from './auth';
import { Nested } from './Nested';

interface AppProps {}

function App({}: AppProps) {
  const onLogin = () => {
    alert('LOGGED IN!');
  };

  return (
    <AuthenticationProvider value={{ onLogin }}>
      <div className="App">
        <h1>Status</h1>
        <Nested />
      </div>
    </AuthenticationProvider>
  );
}

export default App;
import './App.css';

import React from 'react';

import { AuthenticationProvider } from './auth';
import { Nested } from './Nested';

interface AppProps {}

function App({}: AppProps) {
  return (
    <AuthenticationProvider value={{}}>
      <div className="App">
        <h1>Status</h1>
        <Nested />
      </div>
    </AuthenticationProvider>
  );
}

export default App;

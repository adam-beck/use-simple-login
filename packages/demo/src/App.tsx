import './App.css';

import React from 'react';

import { AmsAuthenticationProvider } from './auth';
import { Nested } from './Nested';

interface AppProps {}

function App({}: AppProps) {
  return (
    <AmsAuthenticationProvider>
      <div className="App">
        <h1>Status</h1>
        <Nested />
      </div>
    </AmsAuthenticationProvider>
  );
}

export default App;

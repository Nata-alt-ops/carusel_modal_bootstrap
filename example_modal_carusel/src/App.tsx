import React from 'react';
import logo from './logo.svg';
import { Main } from './pages/main';
import { useState } from 'react';

function App() {
  const[isAuthenticated, setIsAuthenticated ] = useState(false);

  return (
    <Main />
  );
}

export default App;

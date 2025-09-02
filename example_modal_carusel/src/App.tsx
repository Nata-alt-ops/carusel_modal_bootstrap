import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './pages/main';
import { useEffect, useState } from 'react';

function App() {
  const[isAuthenticated, setIsAuthenticated ] = useState(false);

  useEffect(():void => {
    const savedAuth:string|null = localStorage.getItem('isAuthenticated');
    if (savedAuth) {
      setIsAuthenticated(JSON.parse(savedAuth));
    }
  }, []);
  return (
    <Main />
  );
}

export default App;

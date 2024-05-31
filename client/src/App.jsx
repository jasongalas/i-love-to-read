import './App.css';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'; 

import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider>
      <Router>
        <Navbar />
        <Outlet />
      </Router>
    </ApolloProvider>
  );
}

export default App;

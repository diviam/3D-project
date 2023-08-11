import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PortFolio from './components/PortFolio';


const AppRouter = () => {
  return (
    <div className='main'>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portfolio" element={<PortFolio />} />
      </Routes>
    </Router></div>
  );
};

export default AppRouter;

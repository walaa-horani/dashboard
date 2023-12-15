import React, { useEffect } from 'react';
import EditStudent  from './pages/EditStudent';
import {
 
 
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Routes>
    <Route index element={<Dashboard />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/EditStudent/:id" element={<EditStudent />} />
          
         
    </Routes>
  </>
  );
}

export default App;

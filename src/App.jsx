import React from 'react';
import { Routes, Route } from 'react-router-dom' 
import Acceuil from './projet1/pages/Acceuil'
import Detail from './projet1/pages/Details'
import './App.css'

function App() {

  return (
 <div>
     <Routes>
        <Route path="/" element={<Acceuil />} />
      <Route path="/details/:id" element={<Detail />} />
     </Routes>
 </div>
  )
}
export default App

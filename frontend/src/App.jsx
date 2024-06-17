import React, { useState } from 'react';
import GenreSelection from './components/GenreSelection';
import axios from 'axios';
import './App.css';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questionbox from './components/Questionbox';
import AddQuestion from './components/AddQuestion';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element = {<GenreSelection/>}/>
          <Route path='/question' element ={<Questionbox/>}/>
          <Route path='/add' element={<AddQuestion/>}/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  

    </div>
  );
};

export default App;

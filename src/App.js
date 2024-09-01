// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardLogin from './components/CardLogin';
import Book from './components/Book';
import PaymentPage from './components/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/card" element={<CardLogin />} />
        <Route path="/book" element={<Book />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;

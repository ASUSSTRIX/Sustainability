import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AdminLogin from '../pages/Admin/AdminLogin';
import SupplierLogin from '../pages/Supplier/SupplierLogin';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/supplier-login" element={<SupplierLogin />} />
    </Routes>
  </Router>
);

export default AppRoutes;

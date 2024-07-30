import React, { Suspense, lazy } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import About from './About';
 
// Lazy load admin components
const SideBar = lazy(() => import('./SideBar'));
const Dashboard = lazy(() => import('./Dashboard'));
const Products = lazy(() => import('./Products'));
const Support = lazy(() => import('./Support'));
const Payment = lazy(() => import('./Payment'));
const AddAdmin = lazy(() => import('./Add Admin'));

const AdminLayout = () => (
  <div className="flex h-screen bg-white dark:bg-zinc-200">
    <Suspense fallback={<div>Loading Sidebar...</div>}>
      <SideBar />
    </Suspense>
    <div className="flex-grow overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="support" element={<Support />} />
          <Route path="payment" element={<Payment />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  </div>
);
 
export default AdminLayout;
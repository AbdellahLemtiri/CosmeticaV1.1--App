import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';  

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Panier from './pages/Panier';
import MesCommandes from './pages/MesCommandes';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Produits from './pages/admin/Produits';
import Categories from './pages/admin/Categories';
import CommandesAdmin from './pages/admin/Commandes';

 const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Routes>
        
         <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produit/:slug" element={<ProductDetails />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/mes-commandes" element={<MesCommandes />} />
        </Route>

         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="produits" element={<Produits />} />
            <Route path="categories" element={<Categories />} />
            <Route path="commandes" element={<CommandesAdmin />} />
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

 import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/Categories';
import Produits from './pages/admin/Produits';

const Home = () => <div className="p-10 text-3xl font-bold text-center">Page d'accueil Client 🧴</div>;
  
function App() {
  return (
    <div className="min-h-screen font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />  
            <Route path="produits" element={<Produits />} />  
            <Route path="categories" element={<Categories />} />  
            <Route path="commandes" element={<div>Commandes</div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
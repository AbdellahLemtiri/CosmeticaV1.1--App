import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, token } = useContext(AuthContext);

     if (!token || !user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

     return <Outlet />;
};

export default AdminRoute;
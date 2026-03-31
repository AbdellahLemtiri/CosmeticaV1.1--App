import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    
     localStorage.setItem('user', JSON.stringify(userData));

     const role = userData.roles && userData.roles.length > 0 ? userData.roles[0].name : 'client';
    user.role = role;
    console.log("Connecté en tant que:", role);

    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    navigate('/login');
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
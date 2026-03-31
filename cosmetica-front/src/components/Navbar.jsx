import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
           <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-rose-600 transition-colors">
              LA COSMETICA<span className="text-rose-500">.</span>
            </span>
          </Link>

           <div className="flex items-center space-x-6">
             <Link to="/" className="flex items-center gap-2 group">
          
              <span className="text-sm font-medium text-gray-500 group-hover:text-rose-600 transition-colors">
                Accueil
              </span>
          </Link>
             <Link to="/panier" className="relative p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

             {token && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-500 hidden md:block">
                  Salut, <span className="text-gray-900">{user.name}</span>
                </span>
                
                 {user.role === 'admin' ? (
                  <Link to="/admin" className="text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-4 py-2 rounded-lg transition-colors">
                    Dashboard Admin
                  </Link>
                ) : (
                  <Link to="/mes-commandes" className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors">
                    Mes Commandes
                  </Link>
                )}

                <button 
                  onClick={logout}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors">
                  Connexion
                </Link>
                <Link to="/register" className="text-sm font-bold text-white bg-gray-900 hover:bg-rose-600 px-5 py-2.5 rounded-xl transition-all shadow-sm">
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
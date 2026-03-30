import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const Home = () => <div className="p-10 text-3xl font-bold text-gray-800 text-center">Page d'accueil en construction 🚧</div>;

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;
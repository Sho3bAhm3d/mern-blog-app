import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenSquare, Shield, LogOut, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- THIS IS THE LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
            DevBlog.
          </span>
        </Link>
        {/* ------------------------------- */}
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/create" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                <PenSquare className="w-4 h-4" /> Write
              </Link>
              
              {user.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              
              <span className="text-sm text-gray-600">
                Hi, <span className="font-semibold text-gray-900">{user.username}</span>
              </span>
              
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
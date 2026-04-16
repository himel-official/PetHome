import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate('/login');
};

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl">🐾</div>
          <span className="text-2xl font-bold text-gray-800">PetHome</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="hover:text-orange-600 font-medium">Home</Link>
          <Link to="/browse" className="hover:text-orange-600 font-medium">Browse Pets</Link>
          <Link to="/add-pet" className="hover:text-orange-600 font-medium">Post Pet</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-orange-600 font-medium">Dashboard</Link>
              
              {/* NEW: Show roles as small badges */}
              <div className="flex gap-1">
                {user.roles.map(role => (
                  <span key={role} className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                    {role === 'adopter' ? 'Adopter' :
                     role === 'petowner' ? 'Owner' :
                     role === 'caregiver' ? 'Caregiver' : 'Walker'}
                  </span>
                ))}
              </div>

              <Link to="/profile" className="flex items-center gap-2 hover:text-orange-600">
                <span className="font-medium">{user.name}</span>
              </Link>
              
              <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium hover:text-orange-600">Login</Link>
              <Link to="/register" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
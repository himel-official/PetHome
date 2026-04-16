import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: ['adopter']
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role) => {
    setFormData(prev => {
      const currentRoles = [...prev.roles];
      
      if (currentRoles.includes(role)) {
        if (currentRoles.length > 1) {
          return { ...prev, roles: currentRoles.filter(r => r !== role) };
        }
        return prev;
      } else {
        return { ...prev, roles: [...currentRoles, role] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'adopter', label: 'Pet Adopter' },
    { value: 'petowner', label: 'Pet Owner (Listing Pets)' },
    { value: 'caregiver', label: 'Caregiver / Shelter' },
    { value: 'petwalker', label: 'Pet Walker' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-4xl mb-4">
            🐾
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join the PetHome community</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Himel Mahmud"   // ← Changed here
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Himel@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Create a strong password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
            <div className="space-y-3">
              {roleOptions.map((role) => (
                <label
                  key={role.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role.value)}
                    onChange={() => handleRoleToggle(role.value)}
                    className="w-5 h-5 accent-orange-500 cursor-pointer"
                  />
                  <span className="text-gray-700 group-hover:text-orange-600 transition">
                    {role.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 rounded-2xl font-semibold text-lg transition"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
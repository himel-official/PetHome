import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PetCard from '../components/PetCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchUserPets();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserPets = async () => {
    try {
      setError(null);
      const res = await axios.get('http://localhost:5000/api/pets');
      const myPets = res.data.filter(pet => pet.owner?._id === user._id);
      setUserPets(myPets);
    } catch (err) {
      console.error("Failed to fetch pets:", err);
      setError("Could not load your pets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Please log in to view dashboard.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your pets</p>
      </div>

      {/* My Pets Section */}
      <div className="bg-white rounded-3xl shadow p-8 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">My Pets</h2>
          <Link to="/browse" className="text-orange-600 hover:underline font-medium">
            Browse more pets →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading your pets...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : userPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPets.map(pet => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-2xl text-gray-400 mb-4">You haven't listed any pets yet</p>
            <Link 
              to="/add-pet"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-2xl hover:bg-orange-700 transition"
            >
              Post Your First Pet
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 shadow">
          <h3 className="font-semibold text-xl mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Link 
              to="/add-pet"
              className="block p-5 border rounded-2xl hover:bg-orange-50 transition flex items-center gap-4 group"
            >
              <span className="text-3xl">📋</span>
              <div>
                <p className="font-medium group-hover:text-orange-600">Post a new pet for adoption</p>
                <p className="text-sm text-gray-500">List your pet on PetHome</p>
              </div>
            </Link>

            <div className="p-5 border rounded-2xl flex items-center gap-4 opacity-75 cursor-not-allowed">
              <span className="text-3xl">❤️</span>
              <div>
                <p className="font-medium">View Adoption Applications</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Activity */}
        <div className="bg-white rounded-3xl p-8 shadow">
          <h3 className="font-semibold text-xl mb-4">Your Activity</h3>
          <p className="text-gray-500">No recent activity yet.</p>
          <p className="text-sm text-orange-600 mt-6">
            Start by browsing or listing pets!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// frontend/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PetCard from '../components/PetCard';

const Home = () => {
  const [pets, setPets] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsRes, caregiversRes] = await Promise.all([
          axios.get('http://localhost:5000/api/pets'),
          axios.get('http://localhost:5000/api/users/caregivers')
        ]);
        
        // Show only available pets (limit to 6)
        setPets(petsRes.data.filter(p => !p.isAdopted).slice(0, 6));
        setCaregivers(caregiversRes.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6">Find Your Forever Friend 🐾</h1>
          <p className="text-2xl mb-8">Adopt pets • Hire caregivers • Connect with animal lovers</p>
          <Link 
            to="/browse" 
            className="inline-block bg-white text-orange-600 px-10 py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition"
          >
            Browse Pets Now
          </Link>
        </div>
      </div>

      {/* Pet Adoption Posts */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold">Pet Adoption Posts</h2>
            <p className="text-gray-600">Available pets looking for loving homes</p>
          </div>
          <Link to="/browse" className="text-orange-600 hover:underline">See all pets →</Link>
        </div>

        {loading ? (
          <p className="text-center py-12">Loading pets...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map(pet => <PetCard key={pet._id} pet={pet} />)}
          </div>
        )}
      </div>

      {/* Caregiving Services - FIXED */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl font-bold">Caregiving Services</h2>
              <p className="text-gray-600">Professional caregivers & pet walkers near you</p>
            </div>
            <Link to="/caregivers" className="text-orange-600 hover:underline">
              Browse all caregivers →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caregivers.map(cg => {
              const profileImage = cg.profilePic 
                ? `http://localhost:5000${cg.profilePic}` 
                : 'https://via.placeholder.com/120?text=User';

              return (
                <div key={cg._id} className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition text-center">
                  {/* Profile Picture */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-orange-100">
                    <img 
                      src={profileImage}
                      alt={cg.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120?text=User';
                      }}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold mb-1">{cg.name}</h3>

                  {/* Clean Role Badges */}
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {cg.roles.map((role, index) => (
                      <span 
                        key={index}
                        className="px-4 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700"
                      >
                        {role === 'adopter' && 'Adopter'}
                        {role === 'petowner' && 'Pet Owner'}
                        {role === 'caregiver' && 'Caregiver'}
                        {role === 'petwalker' && 'Pet Walker'}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 mt-6 text-sm">
                    {cg.location || 'Dhaka, Bangladesh'}
                  </p>

                  <Link 
                    to={`/caregiver/${cg._id}`}
                    className="mt-8 inline-block text-orange-600 font-medium hover:text-orange-700 transition"
                  >
                    View Profile →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
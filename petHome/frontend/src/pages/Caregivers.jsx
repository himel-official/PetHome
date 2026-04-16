// frontend/src/pages/Caregivers.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/caregivers');
      setCaregivers(res.data);
    } catch (err) {
      console.error('Error fetching caregivers:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading caregivers...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Our Caregivers</h1>
        <p className="text-gray-600 mt-2">Trusted caregivers and shelters ready to help</p>
      </div>

      {caregivers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No caregivers found yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caregivers.map(cg => {
            const profileImage = cg.profilePic 
              ? `http://localhost:5000${cg.profilePic}` 
              : 'https://via.placeholder.com/120?text=User';

            return (
              <div 
                key={cg._id} 
                className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition text-center"
              >
                {/* Profile Picture */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-orange-100">
                  <img 
                    src={profileImage}
                    alt={cg.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/120?text=User';
                    }}
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-2">{cg.name}</h3>

                {/* Role Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
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

                <p className="text-gray-600 text-sm mb-6">
                  {cg.location || 'Dhaka, Bangladesh'}
                </p>

                {cg.bio && (
                  <p className="text-gray-600 text-sm mb-8 line-clamp-3">{cg.bio}</p>
                )}

                <Link 
                  to={`/caregiver/${cg._id}`}
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-medium transition"
                >
                  View Profile
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Caregivers;
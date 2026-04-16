import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pets/${id}`);
      setPet(res.data);
    } catch (err) {
      console.error(err);
      setError('Pet not found or failed to load details');
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = () => {
    alert(`Adoption request for ${pet.name} has been sent! 🐾\n\n(This feature is coming soon with full application system)`);
    // Future: Connect to /api/applications
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading pet details...</div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || 'Pet not found'}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/browse')}
        className="mb-8 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
      >
        ← Back to Browse
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ==================== LEFT: Images ==================== */}
        <div>
          {pet.images && pet.images.length > 0 ? (
            <div className="space-y-6">
              {/* Main Image */}
              <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg aspect-video">
                <img 
                  src={`http://localhost:5000${pet.images[0]}`} 
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                  }}
                />
              </div>

              {/* Thumbnail Gallery */}
              {pet.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {pet.images.slice(1).map((img, index) => (
                    <div key={index} className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                      <img 
                        src={`http://localhost:5000${img}`} 
                        alt={`${pet.name} view ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-3xl aspect-video flex items-center justify-center text-gray-400 text-xl">
              No photos available for this pet
            </div>
          )}
        </div>

        {/* ==================== RIGHT: Details ==================== */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-5xl font-bold text-gray-900">{pet.name}</h1>
              <span className={`px-5 py-2 rounded-full text-sm font-semibold
                ${pet.isAdopted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {pet.isAdopted ? 'Adopted' : 'Available for Adoption'}
              </span>
            </div>

            <p className="text-2xl text-orange-600 mt-2">
              {pet.species} • {pet.breed || 'Unknown breed'}
            </p>
          </div>

          {/* Age Badge */}
          <div className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-lg font-medium">
            {pet.age} years old
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-xl mb-3">About {pet.name}</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {pet.description || "No description provided."}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium text-lg">{pet.gender || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-lg">{pet.location || 'Dhaka, Bangladesh'}</p>
            </div>
          </div>

          {/* Owner Info */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Posted by</p>
            <p className="font-semibold text-xl">{pet.owner?.name || 'Unknown Caregiver'}</p>
          </div>

          {/* Adopt Button */}
          <button 
            onClick={handleAdopt}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-3xl text-xl font-semibold transition flex items-center justify-center gap-3 shadow-lg"
          >
            🐾 Apply to Adopt {pet.name}
          </button>

          <p className="text-center text-sm text-gray-500">
            This will send an adoption request to the current owner.(coming soon)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
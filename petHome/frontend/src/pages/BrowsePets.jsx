import { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';

const BrowsePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('All');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pets');
      setPets(res.data);
    } catch (err) {
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterSpecies === 'All' || pet.species === filterSpecies;
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading adorable pets...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Browse Pets</h1>
          <p className="text-gray-600 mt-2">Find your perfect companion</p>
        </div>

        <div className="flex gap-4 mt-6 md:mt-0">
          <input
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-2xl w-80 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="All">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {filteredPets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No pets found matching your criteria 😔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.map(pet => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePets;
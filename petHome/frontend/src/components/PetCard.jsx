// frontend/src/components/PetCard.jsx
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
  // Fix image URL - add backend base URL
  const imageUrl = pet.images && pet.images.length > 0 
    ? `http://localhost:5000${pet.images[0]}` 
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-56">
        <img 
          src={imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        
        {/* Status Tag */}
        <div className={`absolute top-3 left-3 px-4 py-1 rounded-full text-sm font-bold shadow-md
          ${pet.isAdopted 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'}`}>
          {pet.isAdopted ? 'Adopted ❤️' : 'Available 🐾'}
        </div>

        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
          {pet.species}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <span className="text-orange-600 font-medium">{pet.age} yrs</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pet.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-medium">{pet.location || 'Unknown'}</p>
          </div>
          
          <Link 
            to={`/pets/${pet._id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
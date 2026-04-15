import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    description: '',
    location: ''
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const data = new FormData();

  // Append text fields FIRST
  data.append('name', formData.name);
  data.append('species', formData.species);
  data.append('breed', formData.breed || '');
  data.append('age', formData.age);
  data.append('gender', formData.gender);
  data.append('description', formData.description);
  data.append('location', formData.location);

  // Append images LAST
  images.forEach((image) => {
    data.append('images', image);
  });

  try {
    const res = await axios.post('http://localhost:5000/api/pets', data, {
      headers: { 
        'Content-Type': 'multipart/form-data' 
      }
    });

    alert('Pet posted successfully! 🐾');
    navigate('/dashboard');
  } catch (err) {
    console.error("Full error:", err.response?.data || err.message);
    setError(err.response?.data?.message || 'Failed to post pet');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-center mb-2">Post a Pet for Adoption</h1>
        <p className="text-center text-gray-600 mb-10">Help find a loving home for your pet</p>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Pet Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Luna"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Species</label>
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Golden Retriever"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Dhaka, Bangladesh"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-5 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Tell us about your pet's personality, habits, vaccination status, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Photos (Max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            
            {previewImages.length > 0 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {previewImages.map((src, index) => (
                  <img key={index} src={src} alt="preview" className="rounded-2xl h-24 object-cover" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold text-lg transition disabled:bg-orange-400"
          >
            {loading ? 'Posting Pet...' : 'Post Pet for Adoption'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
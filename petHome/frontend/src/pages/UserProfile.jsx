import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UserProfile = () => {
  const { user, token, updateUser } = useContext(AuthContext);
  
  const [editing, setEditing] = useState(false);
  const [previewPic, setPreviewPic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    roles: user?.roles || ['adopter']
  });

  const roleOptions = [
    { value: 'adopter', label: '🐾 Pet Adopter' },
    { value: 'petowner', label: '📢 Pet Owner' },
    { value: 'caregiver', label: '🏠 Caregiver / Shelter' },
    { value: 'petwalker', label: '🚶 Pet Walker' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRole = (role) => {
    setFormData(prev => {
      const current = [...prev.roles];
      if (current.includes(role)) {
        if (current.length === 1) return prev;
        return { ...prev, roles: current.filter(r => r !== role) };
      } else {
        return { ...prev, roles: [...current, role] };
      }
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('phone', formData.phone);
    data.append('bio', formData.bio);
    data.append('roles', JSON.stringify(formData.roles));   // Important: send as JSON string

    if (selectedFile) {
      data.append('profilePic', selectedFile);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/profile/${user._id}`,
        data,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      if (res.data.user) {
        updateUser(res.data.user);
      }

      alert('Profile updated successfully! 🎉');
      setEditing(false);
      setPreviewPic(null);
      setSelectedFile(null);
    } catch (err) {
      alert('Failed to update profile: ' + (err.response?.data?.message || err.message));
    }
  };

  const currentProfilePic = previewPic || 
    (user?.profilePic ? `http://localhost:5000${user.profilePic}` : 
    'https://via.placeholder.com/128?text=User');

  if (!user) {
    return <div className="text-center py-20 text-xl">Please login to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <button 
            onClick={() => setEditing(!editing)}
            className="px-6 py-3 bg-orange-100 text-orange-700 rounded-2xl hover:bg-orange-200 transition"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-10">
          <div className="relative group">
            <img 
              src={currentProfilePic}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-orange-200 shadow-md"
              onError={(e) => e.target.src = 'https://via.placeholder.com/128?text=User'}
            />
            {editing && (
              <label className="absolute bottom-2 right-2 bg-orange-600 hover:bg-orange-700 text-white text-xs px-4 py-1.5 rounded-full cursor-pointer transition shadow">
                Change Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Full Name</label>
            {editing ? (
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ) : (
              <p className="text-2xl font-semibold">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>

          {/* Roles */}
          <div>
            <label className="block text-sm text-gray-500 mb-3">Your Roles</label>
            
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleOptions.map((role) => (
                  <label
                    key={role.value}
                    className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition
                      ${formData.roles.includes(role.value) 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role.value)}
                      onChange={() => toggleRole(role.value)}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-lg">{role.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {user.roles.map(role => (
                  <span 
                    key={role} 
                    className="px-5 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {role === 'adopter' && '🐾 Adopter'}
                    {role === 'petowner' && '📢 Pet Owner'}
                    {role === 'caregiver' && '🏠 Caregiver'}
                    {role === 'petwalker' && '🚶 Pet Walker'}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Location & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Location</label>
              {editing ? (
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange}
                  className="w-full p-4 border rounded-2xl"
                />
              ) : (
                <p>{user.location || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              {editing ? (
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full p-4 border rounded-2xl"
                />
              ) : (
                <p>{user.phone || 'Not set'}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Bio</label>
            {editing ? (
              <textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange}
                rows={4}
                className="w-full p-4 border rounded-2xl"
                placeholder="Tell others about yourself..."
              />
            ) : (
              <p className="text-gray-700">{user.bio || 'No bio added yet.'}</p>
            )}
          </div>
        </div>

        {editing && (
          <button 
            onClick={handleSave}
            className="mt-10 w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
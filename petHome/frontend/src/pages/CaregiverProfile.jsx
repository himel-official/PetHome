import { useParams } from 'react-router-dom';

const CaregiverProfile = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Caregiver Profile</h1>
      <p className="text-xl text-gray-600">Caregiver ID: {id}</p>
      <p className="mt-8 text-gray-500">Full caregiver profile page coming soon...</p>
    </div>
  );
};

export default CaregiverProfile;
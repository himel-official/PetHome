import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowsePets from './pages/BrowsePets';
import PetProfile from './pages/PetProfile';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import CaregiverProfile from './pages/CaregiverProfile';
import Chatbot from './components/Chatbot';
import AddPet from './pages/AddPet';
import Caregivers from './pages/Caregivers';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/caregivers" element={token ? <Caregivers /> : <Navigate to="/login" />} />
          <Route path="/browse" element={token ? <BrowsePets /> : <Navigate to="/login" />} />
          <Route path="/pets/:id" element={token ? <PetProfile /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/caregiver/:id" element={token ? <CaregiverProfile /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/add-pet" element={token ? <AddPet /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
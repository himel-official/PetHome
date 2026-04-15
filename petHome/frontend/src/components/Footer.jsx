const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-3xl">
              🐾
            </div>
            <span className="text-2xl font-bold">PetHome</span>
          </div>
          <p className="text-gray-400">
            Connecting loving homes with pets in need.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/browse" className="hover:text-white">Browse Pets</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">For Caregivers</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">List Your Pet</a></li>
            <li><a href="#" className="hover:text-white">Become a Caregiver</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">
            Dhaka, Bangladesh<br />
            Email: support@pethome.com
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12 text-sm">
        © 2026 PetHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
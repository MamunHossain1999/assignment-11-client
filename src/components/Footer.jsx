
const Footer = () => {
    return (
        <div className="footer p-10 bg-base-200 text-base-content">
        <div className="footer items-center grid-cols-1 md:grid-cols-3">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold">Food Sharing</h1>
            <p className="text-sm mt-2">Connecting communities for a better tomorrow!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-6 md:mt-0">
            <div>
              <h2 className="text-lg font-semibold">Quick Links</h2>
              <ul className="mt-2">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/available-foods" className="hover:underline">Available Foods</a></li>
                <li><a href="/add-food" className="hover:underline">Add Food</a></li>
                <li><a href="/manage-my-foods" className="hover:underline">Manage My Foods</a></li>
                <li><a href="/my-food-request" className="hover:underline">My Food Request</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">About</h2>
              <ul className="mt-2">
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Follow Us</h2>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i> Facebook</a>
                <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i> Twitter</a>
                <a href="#" className="hover:text-red-500"><i className="fab fa-instagram"></i> Instagram</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-center mt-6 text-center">
          <p className="text-sm text-gray-500">© 2024 Food Sharing. All rights reserved.</p>
        </div>
      </div>
      
    );
};

export default Footer;
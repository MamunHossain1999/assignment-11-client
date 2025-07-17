import logo from '../assets/foodCompanyLogo.png';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white p-4 sm:p-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10">
        
        {/* Services Section */}
        <nav>
          <div className="flex items-center gap-3 mb-4">
            <img className="w-10 h-10 rounded-full" src={logo} alt="company logo" />
            <h6 className="text-lg font-semibold">Services</h6>
          </div>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Branding</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Design</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Marketing</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Advertisement</a>
        </nav>

        {/* Company Section */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">About us</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Contact</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Jobs</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Press kit</a>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Legal</h6>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Terms of use</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Privacy policy</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Cookie policy</a>
        </nav>

        {/* Newsletter Section */}
        <form>
          <h6 className="footer-title text-lg font-semibold mb-4">Newsletter</h6>
          <fieldset className="form-control w-full">
            <label className="label text-">
              <span className="label-text text-white text-base">Enter your email address</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="username@site.com"
                className="input text-white w-full bg-amber-200 sm:flex-1 p-2"
              />
              <button className="btn bg-orange-300 hover:bg-orange-400 text-white border-none w-full sm:w-auto px-6">Subscribe</button>
            </div>
          </fieldset>
        </form>
        
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-base text-white">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

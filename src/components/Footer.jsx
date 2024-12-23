const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Services</h6>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Branding</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Design</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Marketing</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">About us</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Contact</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Jobs</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Legal</h6>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Terms of use</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Privacy policy</a>
          <a className="link link-hover text-gray-100 hover:text-white mb-2 block">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title text-lg font-semibold mb-4">Newsletter</h6>
          <fieldset className="form-control w-full sm:w-80">
            <label className="label text-gray-200">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item w-full sm:w-64 p-2"
              />
              <button className="btn btn-primary join-item w-full sm:w-24 mt-2 sm:mt-0 md:w-40">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

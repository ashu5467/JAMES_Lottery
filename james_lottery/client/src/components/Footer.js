import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="mb-4">
            Welcome to Lottery App! Participation in the lottery is open to individuals 18 years and older.
            Please play responsibly. For support or inquiries, contact us at{" "}
            <a href="mailto:support@yourcompany.com" className="text-blue-400 hover:underline">
              support@yourcompany.com
            </a>.
          </p>
          <p>
            By participating, you agree to our{" "}
            <a href="/terms" className="text-blue-400 hover:underline">
              Terms & Conditions
            </a> and{" "}
            <a href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/lotteries" className="hover:underline">
                Lotteries
              </a>
            </li>
            <li>
              <a href="/results" className="hover:underline">
                Results
              </a>
            </li>
            <li>
              <a href="/winners" className="hover:underline">
                Winners
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:underline">
                Cart
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Get in Touch
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-blue-600 transition"
              aria-label="Follow us on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="Follow us on Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="Follow us on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-blue-700 transition"
              aria-label="Follow us on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Lottery App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

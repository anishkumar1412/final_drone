import React from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-16">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://i.postimg.cc/t41860t1/logo-Darhub.jpg"
                alt="DARUBrahma Logo"
                className="h-14 w-auto mr-3 rounded-lg"
              />
            </div>
            <p className="text-sm leading-relaxed">
              DARUBrahma provides cutting-edge drone solutions tailored for
              agriculture and industrial needs, driving efficiency and
              sustainability through innovation and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Booking", path: "/booking" },
                { name: "Services", path: "/services" },
                {
                  name: "Product",
                  path: "https://bookyourdrone.org/product-category/drone/",
                },
                { name: "Quote Calculator", path: "/quotecalculator" },
                { name: "Training", path: "/training" },
                { name: "Careers", path: "/career" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="hover:text-blue-400 transition-colors duration-200"
                    target={link.path.startsWith("http") ? "_blank" : "_self"}
                    rel={link.path.startsWith("http") ? "noopener noreferrer" : ""}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm">
              <strong>Head Office:</strong>
            </p>
            <p className="text-sm mb-3">
              Plot no. 60, Prachi Enclave, Chandreasekharpur, Bhubaneswar-751016
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> +91 9853248979
            </p>
            <p className="text-sm mb-3">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info.darhub@gmail.com"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                info.darhub@gmail.com
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-6 text-gray-400">
              <a
                href="/"
                className="hover:text-blue-500 transition-colors duration-200"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="/"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="/"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="/"
                className="hover:text-pink-500 transition-colors duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="/"
                className="hover:text-red-500 transition-colors duration-200"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Branch Offices */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">
            Branch Offices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p>
                <strong>Ahmedabad:</strong> iHub Gujarat, KCG Campus,
                Navrangpura
              </p>
            </div>
            <div>
              <p>
                <strong>Mumbai:</strong> Startup Hub, Mahape
              </p>
            </div>
            <div>
              <p>
                <strong>Kolkata:</strong> Sarada Bhavan, Kalimuddin Sarkar Ln
              </p>
            </div>
            <div>
              <p>
                <strong>Bhubaneswar:</strong> Lane 7, Neeladri Vihar
              </p>
            </div>
            <div>
              <p>
                <strong>Patna:</strong> Gola Road, Danapur
              </p>
            </div>
            <div>
              <p>
                <strong>Guwahati:</strong> Juri Complex, Sweet Lane
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 DARUBrahma. All rights reserved. Designed with ❤.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

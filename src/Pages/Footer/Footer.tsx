import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="container mx-auto footer p-10 text-base-content">
        <div className="flex flex-col items-center w-full">
          {/* Main Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <a href="/" className="link link-hover">
              Home
            </a>
            <a href="/about" className="link link-hover">
              About Us
            </a>
            <a href="/all-product" className="link link-hover">
              Products
            </a>
            <a href="/contact" className="link link-hover">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-6">
            <Link
              to="https://www.facebook.com/mohammad.tanvir.114"
              target="_blank"
              className="text-xl hover:text-green-600"
            >
              <FaFacebook />
            </Link>
            <Link
              to="https://x.com"
              target="_blank"
              className="text-xl hover:text-green-600"
            >
              <FaTwitter />
            </Link>
            <Link
              to="https://www.instagram.com/mohammadtanvirfardin"
              target="_blank"
              className="text-xl hover:text-green-600"
            >
              {" "}
              <FaInstagram />
            </Link>
            <Link
              to="https://www.linkedin.com/in/tanvirrashid881"
              target="_blank"
              className="text-xl hover:text-green-600"
            >
              {" "}
              <FaLinkedin />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} Book Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

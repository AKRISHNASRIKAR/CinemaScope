import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0000003b] items-center-safe rounded-2xl pt-12 pb-6 px-4 sm:px-6">
      {/* Copyright and Bottom Links */}
      <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center">
        <p className="text-gray-500 text-sm  text-center items-center">
          © {currentYear} CINEMASCOPE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

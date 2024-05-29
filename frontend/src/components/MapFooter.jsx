import { FaFacebook, FaTwitter } from "react-icons/fa";

const MapFooter = () => {
  return (
    <footer className="bg-blue-950 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm">&copy; 2024 Verkeersongevallen in België.</p>
      <nav>
        <ul className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0">
          <li>
            <a
              href="https://statbel.fgov.be/nl"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Over Ons
            </a>
          </li>
          <li>
            <a
              href="https://statbel.fgov.be/nl/open-data"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Open data
            </a>
          </li>
          <li className="flex space-x-4">
            <a
              href="https://www.facebook.com/Statbel.NL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://x.com/Statbel_nl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              <FaTwitter size={20} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MapFooter;

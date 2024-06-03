import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaChartBar, FaUserFriends } from "react-icons/fa";
import MapFooter from "../components/MapFooter";
import achtergrondAfbeelding from "../img/Home.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => {
      navigate("/map");
    }, 300);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${achtergrondAfbeelding})` }}
    >
      <header className="text-center my-12 bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold animate-bounce">
          Verkeersongevallen in België
        </h1>
        <p className="text-xl mt-4 max-w-xl mx-auto">
          Ontdek en analyseer alle verkeersongevallen die gebeuren binnen de
          Belgische kaart.
        </p>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center">
        <button
          onClick={handleButtonClick}
          className={`bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg transform hover:scale-110 ${
            buttonClicked ? "button-click" : ""
          }`}
        >
          Bekijk de kaart
        </button>

        <section className="mt-16 text-center bg-black bg-opacity-85 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Over dit project</h2>
          <p className="text-lg mt-4 max-w-md mx-auto">
            Dit platform biedt een interactief overzicht van verkeersongevallen
            in België, gemarkeerd met hun specifieke locaties op een dynamische
            kaart. Gebruikers kunnen verschillende filters toepassen om
            specifieke soorten ongevallen te bekijken.
          </p>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-black bg-opacity-100 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <FaMapMarkedAlt className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Interactieve Kaart</h3>
            <p>
              Bekijk verkeersincidenten op een dynamische kaart en ontdek
              patronen.
            </p>
          </div>
          <div className="bg-black bg-opacity-100 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <FaChartBar className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Gedetailleerde Analyses</h3>
            <p>Analyseer data om inzicht te krijgen in verkeersveiligheid.</p>
          </div>
          <div className="bg-black bg-opacity-100 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <FaUserFriends className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Gemeenschap</h3>
            <p>
              Deel inzichten en werk samen met anderen om de verkeersveiligheid
              te verbeteren.
            </p>
          </div>
        </section>
      </div>

      <div className="w-full">
        <MapFooter />
      </div>
    </div>
  );
};

export default HomePage;

import "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-cyber-gradient text-white">
      <header className="text-center my-12">
        <h1 className="text-4xl font-bold">Verkeersongevallen in België</h1>
        <p className="text-xl mt-4 max-w-xl">
          Ontdek en analyseer alle verkeersongevallen die gebeuren binnen de
          Belgische kaart.
        </p>
      </header>

      <Link
        to="/map"
        className="bg-cyber-blue hover:bg-cyber-green text-black font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
      >
        Bekijk de kaart
      </Link>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold">Over dit project</h2>
        <p className="text-lg mt-4 max-w-md">
          Dit platform biedt een interactief overzicht van verkeersongevallen in
          België, gemarkeerd met hun specifieke locaties op een dynamische
          kaart. Gebruikers kunnen verschillende filters toepassen om specifieke
          soorten ongevallen te bekijken.
        </p>
      </section>
    </div>
  );
};

export default HomePage;

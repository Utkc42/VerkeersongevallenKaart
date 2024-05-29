import { Link } from "react-router-dom";
import vlag from "../img/vlag.png";

const MapHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
      <Link
        to="/"
        className="border border-white py-2 px-4 rounded bg-blue-900 hover:bg-blue-700 absolute left-5"
      >
        Home
      </Link>
      <h1 className="text-2xl font-bold mx-auto">
        BELGISCHE VERKEERSONGEVALLEN
      </h1>
      <img
        src={vlag}
        alt="Belgische Vlag"
        className="h-12 w-16 absolute right-5"
      />{" "}
    </header>
  );
};

export default MapHeader;

import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  PROVINCIE,
  WEGCONDITIE,
  VERKEERSSLACHTOFFERS,
  VOERTUIGTYPE1,
  VOERTUIGTYPE2,
  BOTSINGTYPE,
  OBSTAKELS,
} from "../components/DataConstants";

const InformatiePopup = ({ marker, onClose, onPrev, onNext }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Draggable handle=".handle">
        <div className="bg-dark p-6 rounded-lg shadow-lg w-1/2 border border-cyber-blue relative">
          <button
            className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 text-xl border border-red-500 px-3 py-1"
            onClick={onClose}
            title="Sluiten"
          >
            &times;
          </button>
          <div className="bg-gray-800 p-4 rounded-t-lg flex justify-center items-center mb-4 mt-8">
            <h2 className="text-2xl font-bold text-white text-center">
              Ongeval Informatie
            </h2>
          </div>
          <div className="space-y-2 text-lg text-white">
            <p>
              <strong className="text-cyber-blue">Jaar/Maand:</strong>{" "}
              {marker.maand}/{marker.jaar}
            </p>
            <p>
              <strong className="text-cyber-blue">Tijd:</strong> {marker.tijd}
            </p>
            <p>
              <strong className="text-cyber-blue">Regio:</strong> {marker.regio}
            </p>
            <p>
              <strong className="text-cyber-blue">Provincie:</strong>{" "}
              {PROVINCIE[marker.provincie]}
            </p>
            <p>
              <strong className="text-cyber-blue">Stad:</strong> {marker.stad}
            </p>
            <p>
              <strong className="text-cyber-blue">Kruispunt:</strong>{" "}
              {marker.kruispunt}
            </p>
            <p>
              <strong className="text-cyber-blue">Bebouwingsgebied:</strong>{" "}
              {marker.bebouwingsgebied}
            </p>
            <p>
              <strong className="text-cyber-blue">Wegtype:</strong>{" "}
              {marker.wegtype}
            </p>
            <p>
              <strong className="text-cyber-blue">Weer:</strong> {marker.weer}
            </p>
            <p>
              <strong className="text-cyber-blue">Weerlicht:</strong>{" "}
              {marker.weerlicht}
            </p>
            <p>
              <strong className="text-cyber-blue">Wegconditie:</strong>{" "}
              {WEGCONDITIE[marker.wegconditie]}
            </p>
            <p>
              <strong className="text-cyber-blue">Verkeersslachtoffers:</strong>{" "}
              {VERKEERSSLACHTOFFERS[marker.verkeersslachtoffers]}
            </p>
            <p>
              <strong className="text-cyber-blue">Voertuigtype 1:</strong>{" "}
              {VOERTUIGTYPE1[marker.voertuigtype1]}
            </p>
            <p>
              <strong className="text-cyber-blue">Voertuigtype 2:</strong>{" "}
              {VOERTUIGTYPE2[marker.voertuigtype2]}
            </p>
            <p>
              <strong className="text-cyber-blue">Botsingtype:</strong>{" "}
              {BOTSINGTYPE[marker.botsingtype]}
            </p>
            <p>
              <strong className="text-cyber-blue">Obstakels:</strong>{" "}
              {OBSTAKELS[marker.obstakels]}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-white text-dark p-3 rounded hover:bg-opacity-75"
              onClick={onPrev}
            >
              <FaArrowLeft />
            </button>
            <button
              className="bg-white text-dark p-3 rounded hover:bg-opacity-75"
              onClick={onNext}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

InformatiePopup.propTypes = {
  marker: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default InformatiePopup;

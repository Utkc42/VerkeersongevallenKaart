import PropTypes from "prop-types";
import {
  PROVINCIE,
  WEGCONDITIE,
  VERKEERSSLACHTOFFERS,
  VOERTUIGTYPE1,
  VOERTUIGTYPE2,
  BOTSINGTYPE,
  OBSTAKELS,
} from "../components/DataConstants";

const InformatiePopup = ({ marker, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-end">
          <button
            className="text-red-500 hover:text-red-700 text-lg"
            onClick={onClose}
          >
            Sluiten
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Ongeval Informatie</h2>
        <div className="space-y-2 text-lg">
          <p>
            <strong>Jaar/Maand:</strong> {marker.maand}/{marker.jaar}
          </p>
          <p>
            <strong>Tijd:</strong> {marker.tijd}
          </p>
          <p>
            <strong>Regio:</strong> {marker.regio}
          </p>
          <p>
            <strong>Provincie:</strong> {PROVINCIE[marker.provincie]}
          </p>
          <p>
            <strong>Stad:</strong> {marker.stad}
          </p>
          <p>
            <strong>Kruispunt:</strong> {marker.kruispunt}
          </p>
          <p>
            <strong>Bebouwingsgebied:</strong> {marker.bebouwingsgebied}
          </p>
          <p>
            <strong>Wegtype:</strong> {marker.wegtype}
          </p>
          <p>
            <strong>Weer:</strong> {marker.weer}
          </p>
          <p>
            <strong>Weerlicht:</strong> {marker.weerlicht}
          </p>
          <p>
            <strong>Wegconditie:</strong> {WEGCONDITIE[marker.wegconditie]}
          </p>
          <p>
            <strong>Verkeersslachtoffers:</strong>{" "}
            {VERKEERSSLACHTOFFERS[marker.verkeersslachtoffers]}
          </p>
          <p>
            <strong>Voertuigtype 1:</strong>{" "}
            {VOERTUIGTYPE1[marker.voertuigtype1]}
          </p>
          <p>
            <strong>Voertuigtype 2:</strong>{" "}
            {VOERTUIGTYPE2[marker.voertuigtype2]}
          </p>
          <p>
            <strong>Botsingtype:</strong> {BOTSINGTYPE[marker.botsingtype]}
          </p>
          <p>
            <strong>Obstakels:</strong> {OBSTAKELS[marker.obstakels]}
          </p>
        </div>
      </div>
    </div>
  );
};

InformatiePopup.propTypes = {
  marker: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InformatiePopup;

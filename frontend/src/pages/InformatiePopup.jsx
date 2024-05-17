import PropTypes from "prop-types";

const InformatiePopup = ({ marker, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-end">
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>
            Sluiten
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Ongeval Informatie</h2>
        <p>
          <strong>Jaar:</strong> {marker.jaar}
        </p>
        <p>
          <strong>Maand:</strong> {marker.maand}
        </p>
        <p>
          <strong>Tijd:</strong> {marker.tijd}
        </p>
        <p>
          <strong>Regio:</strong> {marker.regio}
        </p>
        <p>
          <strong>Provincie:</strong> {marker.provincie}
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
      </div>
    </div>
  );
};

InformatiePopup.propTypes = {
  marker: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InformatiePopup;

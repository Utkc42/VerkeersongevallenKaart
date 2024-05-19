import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../components/Filters";
import markerImage from "../img/marker.png";
import ErrorBoundary from "../error/ErrorBoundary";
import InformatiePopup from "./InformatiePopup";
import {
  wegtype,
  WEER,
  BEBOUWINGSGEBIED,
  REGIO,
  KRUISPUNT,
  WEERLICHT,
} from "../components/DataConstants";
import { formatTime } from "../components/TimeFormat";

const MapPage = () => {
  const [viewState, setViewState] = useState({
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 8,
  });

  const [markers, setMarkers] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [fetchMarkers, setFetchMarkers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Voeg deze state toe

  useEffect(() => {
    if (fetchMarkers) {
      fetchFilteredAccidents(filterCriteria);
      setFetchMarkers(false);
    }
  }, [fetchMarkers]);

  const fetchFilteredAccidents = async (filterCriteria) => {
    try {
      const response = await axios.get("http://localhost:8000/api/accidents", {
        params: filterCriteria,
      });
      console.log("API response:", response.data);
      if (Array.isArray(response.data.data)) {
        const validAccidents = response.data.data.filter(
          (acc) =>
            acc.longitude &&
            acc.latitude &&
            !isNaN(acc.longitude) &&
            !isNaN(acc.latitude)
        );
        const newMarkersData = validAccidents.map((acc) => ({
          key: `${acc.id}-${acc.longitude}-${acc.latitude}`, // Unieke sleutel voor elke marker
          id: acc.id,
          latitude: parseFloat(acc.latitude),
          longitude: parseFloat(acc.longitude),
          jaar: acc.JAAR,
          maand: acc.MAAND,
          tijd: formatTime(acc.TIJD),
          stad: acc.STAD,
          wegtype: wegtype[acc.WEGTYPE],
          weer: WEER[acc.WEER],
          bebouwingsgebied: BEBOUWINGSGEBIED[acc.BEBOUWINGSGEBIED],
          provincie: acc.PROVINCIE,
          weerlicht: WEERLICHT[acc.WEERLICHT],
          regio: REGIO[acc.REGIO],
          kruispunt: KRUISPUNT[acc.KRUISPUNT],
          wegconditie: acc.WEGCONDITIE,
          verkeersslachtoffers: acc.VERKEERSSLACHTOFFERS,
          voertuigtype1: acc.VOERTUIGTYPE1,
          voertuigtype2: acc.VOERTUIGTYPE2,
          botsingtype: acc.BOTSINGTYPE,
          obstakels: acc.OBSTAKELS,
        }));
        setMarkers(newMarkersData);
      } else {
        console.error("Expected an array, received:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch filtered accidents:", error);
    }
  };

  const handleSearchClick = () => {
    if (Object.keys(filterCriteria).length === 0) {
      setErrorMessage("Selecteer om te zoeken alstublieft");
    } else {
      setErrorMessage(""); // Verwijder eventuele bestaande foutmelding
      setFetchMarkers(true);
    }
  };

  const handleResetClick = () => {
    setMarkers([]); // Clear all markers from the map
    setFilterCriteria({}); // Reset filter criteria
    setSelectedMarker(null); // Deselect any selected marker
    setErrorMessage(""); // Reset error message
  };

  return (
    <div className="flex h-screen">
      <ErrorBoundary>
        <ReactMapGL
          {...viewState}
          width="70%"
          height="90%"
          mapStyle="mapbox://styles/mo42/clw5c7aps02ny01qp13jugo2c"
          mapboxAccessToken="pk.eyJ1IjoibW80MiIsImEiOiJjbHc1YzAxejAwcTZvMnpyejJlbzl4aW1nIn0.CKmkMIFr7WrYL8gDGz-U4Q"
          onMove={(evt) => setViewState(evt.viewState)}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.key}
              latitude={marker.latitude}
              longitude={marker.longitude}
              onClick={() => setSelectedMarker(marker)}
            >
              <img
                src={markerImage}
                alt="Custom Marker"
                style={{
                  width: "15px",
                  height: "15px",
                  cursor: "pointer",
                }}
              />
            </Marker>
          ))}

          {selectedMarker && (
            <InformatiePopup
              marker={selectedMarker}
              onClose={() => setSelectedMarker(null)}
            />
          )}

          <NavigationControl />
          <FullscreenControl />
          <GeolocateControl />
        </ReactMapGL>
      </ErrorBoundary>
      <div className="w-1/3 bg-dark p-4 overflow-auto">
        <Filter setFilterCriteria={setFilterCriteria} />
        {errorMessage && (
          <p className="text-red-500 font-bold mt-2">{errorMessage}</p>
        )}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearchClick}
        >
          Zoek Op Kaart
        </button>
        <button
          className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
      <Link
        to="/"
        className="absolute top-5 left-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
      >
        Terug naar Home
      </Link>
    </div>
  );
};

export default MapPage;

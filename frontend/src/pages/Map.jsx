// src/pages/Map.jsx

import { useState, useEffect, useRef } from "react";
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
  PROVINCIE,
  WEERLICHT,
  REGIO,
  KRUISPUNT,
  WEGCONDITIE,
  VERKEERSSLACHTOFFERS,
  VOERTUIGTYPE1,
  VOERTUIGTYPE2,
  BOTSINGTYPE,
  OBSTAKELS,
} from "../components/DataConstants";

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
  const colorMapRef = useRef({});
  const colorIndexRef = useRef(0);

  const colorPalette = [
    "0deg",
    "45deg",
    "90deg",
    "135deg",
    "180deg",
    "225deg",
    "270deg",
    "315deg",
  ];

  useEffect(() => {
    if (fetchMarkers) {
      fetchFilteredAccidents();
      setFetchMarkers(false);
    }
  }, [fetchMarkers]);

  const fetchFilteredAccidents = async () => {
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
          tijd: acc.TIJD,
          stad: acc.STAD,
          wegtype: wegtype[acc.WEGTYPE],
          weer: WEER[acc.WEER],
          bebouwingsgebied: BEBOUWINGSGEBIED[acc.BEBOUWINGSGEBIED],
          provincie: PROVINCIE[acc.PROVINCIE],
          weerlicht: WEERLICHT[acc.WEERLICHT],
          regio: REGIO[acc.REGIO],
          kruispunt: KRUISPUNT[acc.KRUISPUNT],
          wegconditie: WEGCONDITIE[acc.WEGCONDITIE],
          verkeersslachtoffers: VERKEERSSLACHTOFFERS[acc.VERKEERSSLACHTOFFERS],
          voertuigtype1: VOERTUIGTYPE1[acc.VOERTUIGTYPE1],
          voertuigtype2: VOERTUIGTYPE2[acc.VOERTUIGTYPE2],
          botsingtype: BOTSINGTYPE[acc.BOTSINGTYPE],
          obstakels: OBSTAKELS[acc.OBSTAKELS],
        }));
        setMarkers((prevMarkers) => {
          const allMarkers = [...prevMarkers, ...newMarkersData];
          const uniqueMarkers = allMarkers.filter(
            (marker, index, self) =>
              index === self.findIndex((m) => m.key === marker.key)
          );
          return uniqueMarkers;
        });
      } else {
        console.error("Expected an array, received:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch filtered accidents:", error);
    }
  };

  const handleSearchClick = () => {
    setFetchMarkers(true);
  };

  const handleResetClick = () => {
    setMarkers([]); // Clear all markers from the map
    setFilterCriteria({}); // Reset filter criteria
    setSelectedMarker(null); // Deselect any selected marker
    colorMapRef.current = {}; // Reset color map
    colorIndexRef.current = 0; // Reset color index
  };

  const getColor = (value) => {
    if (!colorMapRef.current[value]) {
      colorMapRef.current[value] =
        colorPalette[colorIndexRef.current % colorPalette.length];
      colorIndexRef.current++;
    }
    return colorMapRef.current[value];
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
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  filter: `hue-rotate(${getColor(marker.jaar)})`,
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

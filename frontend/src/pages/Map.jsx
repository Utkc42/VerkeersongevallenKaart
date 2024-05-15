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

const MapPage = () => {
  const [viewState, setViewState] = useState({
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 8,
  });

  const [markers, setMarkers] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [fetchMarkers, setFetchMarkers] = useState(false);

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
          latitude: parseFloat(acc.latitude),
          longitude: parseFloat(acc.longitude),
        }));
        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkersData]);
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
          {markers.map((marker, index) => (
            <Marker
              key={index}
              latitude={marker.latitude}
              longitude={marker.longitude}
            >
              <img
                src={markerImage}
                alt="Custom Marker"
                style={{ width: "30px", height: "30px" }}
              />
            </Marker>
          ))}
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

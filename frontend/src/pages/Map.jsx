import { useState, useEffect, useRef } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import axios from "axios";
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
import MapHeader from "../components/MapHeader";
import MapFooter from "../components/MapFooter";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const markerIndex = useRef(0);
  const filterRef = useRef();

  useEffect(() => {
    if (fetchMarkers) {
      fetchFilteredAccidents(filterCriteria);
      setFetchMarkers(false);
    }
  }, [fetchMarkers]);

  const fetchFilteredAccidents = async (filterCriteria) => {
    setLoading(true);
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
          maand: acc.MAAND < 10 ? `0${acc.MAAND}` : acc.MAAND, // Maand met voorloopnul
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
        newMarkersData.sort((a, b) => a.stad.localeCompare(b.stad));
        setMarkers(newMarkersData);
      } else {
        console.error("Expected an array, received:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch filtered accidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (Object.keys(filterCriteria).length === 0) {
      setErrorMessage("Selecteer om te zoeken alstublieft");
    } else {
      setErrorMessage("");
      setFetchMarkers(true);
    }
  };

  const handleResetClick = () => {
    setMarkers([]);
    setFilterCriteria({});
    setSelectedMarker(null);
    setErrorMessage("");
    filterRef.current.resetFilters();
  };

  const handleMarkerClick = (index) => {
    markerIndex.current = index;
    setSelectedMarker(markers[index]);
  };

  const handlePrevClick = () => {
    const newIndex =
      (markerIndex.current - 1 + markers.length) % markers.length;
    markerIndex.current = newIndex;
    setSelectedMarker(markers[newIndex]);
  };

  const handleNextClick = () => {
    const newIndex = (markerIndex.current + 1) % markers.length;
    markerIndex.current = newIndex;
    setSelectedMarker(markers[newIndex]);
  };

  return (
    <div className="flex flex-col h-screen">
      <MapHeader />
      <div className="flex h-full">
        <ErrorBoundary>
          <ReactMapGL
            {...viewState}
            width="70%"
            height="100%"
            mapStyle="mapbox://styles/mo42/clw5c7aps02ny01qp13jugo2c"
            mapboxAccessToken="pk.eyJ1IjoibW80MiIsImEiOiJjbHc1YzAxejAwcTZvMnpyejJlbzl4aW1nIn0.CKmkMIFr7WrYL8gDGz-U4Q"
            onMove={(evt) => setViewState(evt.viewState)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={marker.key}
                latitude={marker.latitude}
                longitude={marker.longitude}
                onClick={() => handleMarkerClick(index)}
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
                onPrev={handlePrevClick}
                onNext={handleNextClick}
              />
            )}

            <NavigationControl />
            <FullscreenControl />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserLocation={true}
              fitBoundsOptions={{ maxZoom: 10 }}
              showAccuracyCircle={false}
            />
          </ReactMapGL>
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </ErrorBoundary>
        <div className="w-1/3 bg-gray-800 p-4 overflow-auto">
          <Filter ref={filterRef} setFilterCriteria={setFilterCriteria} />
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
      </div>
      <MapFooter />
    </div>
  );
};

export default MapPage;

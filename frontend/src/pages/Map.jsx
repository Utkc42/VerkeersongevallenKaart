import { useState } from "react";
import Filter from "../components/Filters";

import ReactMapGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";

const MapPage = () => {
  const [viewState, setViewState] = useState({
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 7.5,
  });
  const [language, setLanguage] = useState("nl"); // Standaardtaal

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ReactMapGl
        {...viewState}
        width="70%"
        height="90%"
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mo42/cluldw1ye00kw01qqg4nhc50k"
        mapboxAccessToken="pk.eyJ1IjoibW80MiIsImEiOiJjbHVsZDYzeTAweGh0MnFsNWkwYTJuMjgyIn0.qiKICPYsmaJC3ZcdpAy91g"
      >
        <GeolocateControl />
        <FullscreenControl />
        <NavigationControl />
      </ReactMapGl>
      <div style={{ width: "30%" }}>
        <Filter language={language} onLanguageChange={setLanguage} />
      </div>
    </div>
  );
};

export default MapPage;

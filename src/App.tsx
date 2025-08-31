import React from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/map/Map";
import Filters from "./components/filters/Filters";

const App: React.FC = () => {
  return (
    <div className="app">
      <h2>City Pulse Transit Visualization</h2>
      <div className="pageSplit">
        <Map />
        <Filters />
      </div>
    </div>
  );
};

export default App;

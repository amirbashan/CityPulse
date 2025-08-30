import React from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>City Puls Transit Visualization</h1>
      <Map />
    </div>
  );
};

export default App;

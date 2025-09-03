import React from "react";
import MuinicipalityFilter from "./MuinicipalityFilter";
import VehiclesFilter from "./VehiclesFilter";
import "./filters.css";
import AnimateFilter from "./AnimateFilter";

export default function Filters() {
  return (
    <div className="filters">
      <h3>Filters</h3>
      <MuinicipalityFilter />
      <VehiclesFilter />
      <AnimateFilter />
    </div>
  );
}

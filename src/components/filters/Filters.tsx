import React from "react";
import MuinicipalityFilter from "./MuinicipalityFilter";
import DisplayedTime from "./DisplayedTime";
import "./filters.css";
import AnimateFilter from "./AnimateFilter";
import ExtraFilters from "./ExtraFilters";

export default function Filters() {
  return (
    <div className="filters">
      <h3>Filters</h3>
      <MuinicipalityFilter />
      <DisplayedTime />
      <AnimateFilter />
      <ExtraFilters />
    </div>
  );
}

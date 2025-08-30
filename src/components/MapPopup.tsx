import React from "react";
import { Popup } from "react-leaflet";
import { Vehicle } from "../utils/interfaces";

export default function MapPopup(vehicle: Vehicle) {
  return (
    <Popup>
      <div className="vehicle-popup">
        <h4>{vehicle.id}</h4>
        <p>
          <strong>Speed:</strong> {vehicle.speed} km/h
        </p>
        <p>
          <strong>Route:</strong> {vehicle.route}
        </p>
        <p>
          <strong>Operator:</strong> {vehicle.operator}
        </p>
      </div>
    </Popup>
  );
}

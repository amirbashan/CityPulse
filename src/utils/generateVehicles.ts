import { Vehicle } from "./interfaces";

export const generateSampleVehicles = (x = 1): Vehicle[] => {
  const vehicles: Vehicle[] = [];
  const centerLat = 32.0853;
  const centerLng = 34.7818;
  const operators = ["Egged", "Dan", "Metropoline"];

  for (let i = 0; i < x; i++) {
    vehicles.push({
      id: `vehicle_${i}`,
      lat: centerLat + (Math.random() - 0.5) * 0.08,
      lng: centerLng + (Math.random() - 0.5) * 0.08,
      speed: Math.round(Math.random() * 60),
      route: `Route ${Math.floor(Math.random() * 50) + 1}`,
      operator: operators[Math.floor(Math.random() * operators.length)],
    });
  }
  return vehicles;
};

import { IVehicleRecord } from "./interfaces";

export const parseSiriVehicles = (data: IVehicleRecord[]) => {
  const vehicles: any[] = [];
  // const operators = ["Egged", "Dan", "Metropoline"];

  for (const bus of data) {
    const {
      Bearing,
      // FramedVehicleJourneyRef,
      // LineRef,
      // MonitoredCall,
      OperatorRef,
      OriginAimedDepartureTime,
      VehicleLocation,
      VehicleRef,
      Velocity,
    } = bus.MonitoredVehicleJourney;

    if (!VehicleLocation?.Latitude || !VehicleLocation?.Longitude || !VehicleRef) {
      continue;
    }
    vehicles.push({
      recordedAtTime: bus.RecordedAtTime,
      id: `vehicle_${OperatorRef}_${VehicleRef}_${OriginAimedDepartureTime}`,
      lat: VehicleLocation?.Latitude,
      lng: VehicleLocation?.Longitude,
      speed: Velocity,
      route: Bearing,
      operator: OperatorRef,
    });
  }

  return vehicles;
};

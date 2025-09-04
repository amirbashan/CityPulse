export interface IVehicle {
  id: string;
  lat: number;
  lng: number;
  speed: number;
  route: string;
  operator: string;
}

export interface IMunicipalityProperties {
  name?: string;
  NAME?: string;
  [key: string]: any;
}

export interface IMunicipalityFeature {
  type: "Feature";
  properties: IMunicipalityProperties;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface IMunicipalityData {
  type: "FeatureCollection";
  features: IMunicipalityFeature[];
}

export interface IVehicleLocation {
  Longitude: string;
  Latitude: string;
}

export interface IFramedVehicleJourneyRef {
  DataFrameRef: string;
  DatedVehicleJourneyRef: string;
}

export interface IMonitoredCall {
  StopPointRef: string;
  Order: string;
  DistanceFromStop: string;
}

export interface IMonitoredVehicleJourney {
  LineRef: string;
  FramedVehicleJourneyRef: IFramedVehicleJourneyRef;
  OperatorRef: string;
  OriginAimedDepartureTime: string;
  VehicleLocation: IVehicleLocation;
  Bearing: string;
  Velocity: string;
  VehicleRef: string;
  MonitoredCall: IMonitoredCall;
}

export interface IVehicleRecord {
  RecordedAtTime: string;
  MonitoredVehicleJourney: IMonitoredVehicleJourney;
}

export enum ExtraFilter {
  MinSpeed = "minSpeed",
  Route = "route",
  Operator = "operator",
}
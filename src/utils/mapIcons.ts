import L from "leaflet";

export const createSpeedBasedBusIcon = (vehicle: any) => {
  const speed = Number(vehicle.speed) || 0;
  let color;
  
  if (speed === 0) {
    color = '#6b7280'; // Gray for stopped
  } else if (speed <= 20) {
    color = '#10b981'; // Green for slow
  } else if (speed <= 50) {
    color = '#f59e0b'; // Yellow for medium
  } else {
    color = '#ef4444'; // Red for fast
  }
  
  // Get route/line number for display
  const routeNumber = vehicle.route || vehicle.lineNumber || '';
  
  return L.divIcon({
    html: `
      <div style="position: relative; display: inline-block;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="10" rx="2" fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="7" cy="18" r="1.5" fill="#374151"/>
          <circle cx="17" cy="18" r="1.5" fill="#374151"/>
          <rect x="6" y="8" width="2.5" height="1.5" fill="white" opacity="0.9"/>
          <rect x="9.5" y="8" width="2.5" height="1.5" fill="white" opacity="0.9"/>
          <rect x="13" y="8" width="2.5" height="1.5" fill="white" opacity="0.9"/>
          <rect x="16.5" y="8" width="1" height="1.5" fill="white" opacity="0.9"/>
          <rect x="6" y="10.5" width="2.5" height="1.5" fill="white" opacity="0.9"/>
          <rect x="9.5" y="10.5" width="2.5" height="1.5" fill="white" opacity="0.9"/>
          <rect x="13" y="10.5" width="2.5" height="1.5" fill="white" opacity="0.9"/>
          <rect x="16.5" y="10.5" width="1" height="1.5" fill="white" opacity="0.9"/>
          <rect x="5" y="13" width="14" height="1" fill="white" opacity="0.7"/>
        </svg>
        ${routeNumber ? `
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: black;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            line-height: 1;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
            pointer-events: none;
          ">
            ${routeNumber}
          </div>
        ` : ''}
      </div>
    `,
    className: 'bus-speed-marker',
    iconSize: [40, 40],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};
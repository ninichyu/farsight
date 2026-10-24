"use client";

import { CircleMarker, MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Alert = {
  id: string;
  latitude: number;
  longitude: number;
};

type IncidentMapProps = {
  alerts: Alert[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function IncidentMap({ alerts, selectedId, onSelect }: IncidentMapProps) {
  return (
    <MapContainer center={[37.8719, -122.2585]} zoom={16} zoomControl={false} className="leaflet-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {alerts.map((alert, index) => (
        <CircleMarker
          key={alert.id}
          center={[alert.latitude, alert.longitude]}
          radius={selectedId === alert.id ? 12 : 9}
          pathOptions={{ color: "#fff", weight: 3, fillColor: index === 0 ? "#e54550" : "#e5a542", fillOpacity: 1 }}
          eventHandlers={{ click: () => onSelect(alert.id) }}
        />
      ))}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
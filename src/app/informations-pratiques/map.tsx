"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
    position: [number, number];
    popup: string;
  };

const DefaultIcon = new Icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

(Icon.Default.prototype.options as any).icon = DefaultIcon;

export default function Map({ position, popup }: MapProps) {
//   const position = [43.604403, 1.446143];

  return (
    <div id="map" className="h-72 w-full">
      <MapContainer
        center={position as any}
        zoom={100}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={DefaultIcon}>
          <Popup>{popup}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

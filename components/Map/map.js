"use client"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";

const Map = () => {
  return (
    <div>
      <MapContainer center={[40.68, 20.78]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker  center={[40.68, 20.78]} radius={10} color="transparent" fillColor="green" opacity={0.5}>
            <Popup>
                salam
            </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default Map;

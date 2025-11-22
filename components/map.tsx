"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapProps {
  latitude: number;
  longitude: number;
  address?: string;
  height?: string;
}


export function Map({ latitude, longitude, address, height = "400px" }: MapProps) {
  const [mounted, setMounted] = React.useState(false);
  const center: [number, number] = [latitude, longitude];

  // Fix for default marker icon issue in Next.js
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      const L = require("leaflet");
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
    }
  }, []);

  if (!mounted) {
    return (
      <div style={{ height, width: "100%" }} className="rounded-md border flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <div style={{ height, width: "100%" }} className="rounded-md border overflow-hidden">
      <MapContainer
        key={`map-${latitude.toFixed(6)}-${longitude.toFixed(6)}`}
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          {address && (
            <Popup>
              <div>
                <strong>{address}</strong>
                <br />
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </div>
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
}


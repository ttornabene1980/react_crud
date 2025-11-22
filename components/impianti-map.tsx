"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { Impianto } from "@/types";

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

interface ImpiantiMapProps {
  impianti: Impianto[];
  onMarkerClick: (impianto: Impianto) => void;
  height?: string;
}

export function ImpiantiMap({
  impianti,
  onMarkerClick,
  height = "600px",
}: ImpiantiMapProps) {
  const [mounted, setMounted] = React.useState(false);

  // Filter impianti that have coordinates
  const impiantiWithCoords = React.useMemo(
    () =>
      impianti.filter(
        (i) =>
          i.latitudine !== undefined &&
          i.longitudine !== undefined &&
          i.latitudine !== null &&
          i.longitudine !== null
      ),
    [impianti]
  );

  // Calculate center point (average of all coordinates)
  const center: [number, number] = React.useMemo(() => {
    if (impiantiWithCoords.length === 0) {
      return [45.4642, 9.1900]; // Default to Milan
    }
    const avgLat =
      impiantiWithCoords.reduce((sum, i) => sum + (i.latitudine || 0), 0) /
      impiantiWithCoords.length;
    const avgLon =
      impiantiWithCoords.reduce((sum, i) => sum + (i.longitudine || 0), 0) /
      impiantiWithCoords.length;
    return [avgLat, avgLon];
  }, [impiantiWithCoords]);

  // Fix for default marker icon issue in Next.js
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      const L = require("leaflet");
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
    }
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="rounded-md border flex items-center justify-center"
      >
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  if (impiantiWithCoords.length === 0) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="rounded-md border flex items-center justify-center"
      >
        <div className="text-muted-foreground">
          No impianti with coordinates available. Add coordinates to see them on the map.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ height, width: "100%" }}
      className="rounded-md border overflow-hidden"
    >
      <MapContainer
        center={center}
        zoom={impiantiWithCoords.length === 1 ? 13 : 8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {impiantiWithCoords.map((impianto) => (
          <Marker
            key={impianto.id}
            position={[impianto.latitudine!, impianto.longitudine!]}
            eventHandlers={{
              click: () => {
                onMarkerClick(impianto);
              },
            }}
          >
            <Popup>
              <div>
                <strong>{impianto.denominazione}</strong>
                <br />
                <span className="text-sm text-muted-foreground">
                  {impianto.codice}
                </span>
                <br />
                {impianto.indirizzo && (
                  <>
                    <span className="text-sm">{impianto.indirizzo}</span>
                    <br />
                  </>
                )}
                <span className="text-xs text-muted-foreground">
                  {impianto.libero ? "Libero" : "Occupato"}
                </span>
                <br />
                <button
                  className="mt-2 text-sm text-primary hover:underline"
                  onClick={() => onMarkerClick(impianto)}
                >
                  Edit Impianto
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}


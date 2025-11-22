// Geocoding utility using Nominatim (OpenStreetMap)
// Free and no API key required

export interface GeocodingResult {
  lat: number;
  lon: number;
  display_name: string;
}

export async function geocodeAddress(
  address: string
): Promise<GeocodingResult | null> {
  if (!address || address.trim() === "") {
    return null;
  }

  try {
    // Use Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1`,
      {
        headers: {
          "User-Agent": "Gestionale-App/1.0", // Required by Nominatim
        },
      }
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name,
      };
    }

    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}


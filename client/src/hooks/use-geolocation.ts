import type { Cordinates } from "@/API/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinates: Cordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeoLocation() {
  const [locationData, setlocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getlocation = () => {
    setlocationData((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    if (!navigator.geolocation) {
      setlocationData({
        coordinates: null,
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setlocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setlocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      }
    );
  };

  useEffect(() => {
    getlocation();
  }, []);

  return {
    ...locationData,
    getlocation,
  };
}

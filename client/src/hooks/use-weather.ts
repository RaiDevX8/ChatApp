import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "@/API/weather";
import type { Cordinates } from "@/API/types";

export const WEATHER_KEYS = {
  weather: (coords: Cordinates) => ["weather", coords] as const,
  forecast: (coords: Cordinates) => ["forecast", coords] as const,
  location: (coords: Cordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(Cordinates: Cordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(Cordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      Cordinates ? weatherAPI.getCurrentWeather(Cordinates) : null,
    enabled: !!Cordinates,
  });
}

export function useForecastQuery(Cordinates: Cordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(Cordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (Cordinates ? weatherAPI.getForcast(Cordinates) : null),
    enabled: !!Cordinates,
  });
}

export function useReverseGeocodeQuery(Cordinates: Cordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(Cordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      Cordinates ? weatherAPI.getGeocode(Cordinates) : null,
    enabled: !!Cordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length >= 3,
  });
}
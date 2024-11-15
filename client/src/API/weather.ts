
  import { API_CONFIG } from "./config";
  import { Cordinates, ForcastData, Geocode, WeatherData } from "./types";
  
  class WeatherAPI {
    private createUrl(endpoint: string, params: Record<string, string | number>) {
      const searchParams = new URLSearchParams({
        appid: API_CONFIG.API_KEY,
        ...params,
      });
  
      return `${endpoint}?${searchParams.toString()}`; 
    }
  
    private async fetchData<T>(url: string): Promise<T> {
      console.log(url); // Debugging the URL
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Weather API ERROR: ${response.statusText}`);
      }
      return response.json();
    }
  
    async getCurrentWeather({ lat, lon }: Cordinates): Promise<WeatherData> {
      const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: API_CONFIG.DEFALUT_PARAMS.units,
      });
      return this.fetchData<WeatherData>(url);
    }
  
    async getForcast({ lat, lon }: Cordinates): Promise<ForcastData> {
      const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: API_CONFIG.DEFALUT_PARAMS.units,
      });
      return this.fetchData<ForcastData>(url);
    }
  
    async getGeocode({ lat, lon }: Cordinates): Promise<Geocode[]> {
      const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
        lat: lat.toString(),
        lon: lon.toString(),
        limit: 1,
      });
      return this.fetchData<Geocode[]>(url);
    }
  }
  
  export const weatherAPI = new WeatherAPI();
  
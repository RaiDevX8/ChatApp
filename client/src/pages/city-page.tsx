import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams, useSearchParams } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react';
import WeatherSkeleton from '@/components/LocationLoading';
import HourlyTemperature from '@/components/Hourlytemperature';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForcast from '@/components/WeatherForcast';
import WeatherNews from '@/components/WeatherAlert';
import Map from '@/components/Map';

const city_page = () => {
    const [searchparam]=useSearchParams();
      const param = useParams();
      const lat = parseFloat(searchparam.get("lat")||"O")
      const lon =  parseFloat(searchparam.get("lon")||"O")

      const coordinates ={
        lat,lon
      }
      console.log(coordinates)
      const weatherQuery = useWeatherQuery(coordinates);
      const forecastQuery = useForecastQuery(coordinates);
      const locationQuery = useReverseGeocodeQuery(coordinates);

      if (weatherQuery.error || forecastQuery.error) {
        return (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Failed to fetch weather data. Please try again.</p>
            </AlertDescription>
          </Alert>
        );
      }
      if (!weatherQuery.data || !forecastQuery.data || !param.cityName) {
        return <WeatherSkeleton />;
      }
    
    
      return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
             Location {locationQuery?.data ? ` - ${locationQuery.data[0].name}` : ""}
          </h1>
          
        </div>
  
        <div className="grid gap-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {weatherQuery.data && <CurrentWeather data={weatherQuery.data}  />}
            {forecastQuery && <HourlyTemperature data={forecastQuery.data} />}
          </div>
          {coordinates?<Map coordinates={coordinates}/>:""}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-6">
      <WeatherDetails data={weatherQuery.data} />
    </div>
    <WeatherForcast data={forecastQuery.data} />
  
  </div>
  
       
  
        </div>
      </div>
  )
}

export default city_page
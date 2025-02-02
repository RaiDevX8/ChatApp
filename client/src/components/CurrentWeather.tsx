import type { Geocode, WeatherData } from '@/API/types';
import {
  Card,
  CardContent,
  
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: Geocode;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;


  // Format the temperature with rounding to 2 decimal places
  const formatTemp = (temp: number | undefined): string => {
    if (temp === undefined) return 'N/A';
    // Convert Kelvin to Celsius
    const celsiusTemp = temp - 273.15;
    return `${Math.round(celsiusTemp)}°C`;
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                <span className="text-muted-foreground">, {locationName?.state}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className='text-7xl font-bold tracking-tighter '>{formatTemp(temp)}</p> 
              <div className="space-y-1">
                <p className='text-muted font-medium text-sm'>Feels like {formatTemp(feels_like)}</p>
              </div>
              <div className="flex gap-2 text font-medium">
                <span className='felx items-center gap-1 text-blue-500'><ArrowDown className='h-3 w-3'/>
                {formatTemp(temp_min)}</span>
                <span className='felx items-center gap-1 text-red-500'><ArrowUp className='h-3 w-3'/>
                {formatTemp(temp_max)}</span>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <Droplets className='h-4 w-4 text-blue-500'/>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-sm text-muted-foreground">{humidity}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Wind className='h-4 w-4 text-blue-500'/>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Wind speed</p>
                        <p className="text-sm text-muted-foreground">{speed}%</p>
                    </div>
                </div>
            </div>
            
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} className='h-full w-full object-contain'/>
                <div className="absolute bottom-0 text-center">
                    <p className='text-sm font-medium capitalize'>{currentWeather.description}</p>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;

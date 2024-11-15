import { ForcastData } from '@/API/types'
import {format} from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';
interface Weather{
    data: ForcastData
}
interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  }
const WeatherForcast = ({data}:Weather) => {
    const dailyForecast= data.list.reduce((acc,forcast)=>{
                    const date = format(new Date(forcast.dt*1000),"yyyy-MM-dd");

                    if(!acc[date]){
                        acc[date]={
                            temp_min:forcast.main.temp_min,
                            temp_max: forcast.main.temp_max,
                            humidity: forcast.wind.speed,
                            wind :forcast.wind.speed,
                            weather: forcast.weather[0],
                            date:forcast.dt

                        }
                    }else{
                            acc[date].temp_min =Math.min(acc[date].temp_min,forcast.main.temp_min);
                            acc[date].temp_max =Math.max(acc[date].temp_max,forcast.main.temp_max);

                    }
                    return acc;
    },{} as Record<string,DailyForecast>)

    const nextDays= Object.values(dailyForecast).slice(0,6)
    const formatTemp = (temp: number | undefined): string => {
        if (temp === undefined) return 'N/A';
        // Convert Kelvin to Celsius
        const celsiusTemp = temp - 273.15;
        return `${Math.round(celsiusTemp)}°C`;
      };
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                5_day Forecast
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="">
                {
                    nextDays.map((day)=>
                    {
                        return <div key={day.date} className="grid grid-col-3 items-center gap-4 rounded-lg border p-4">
                                    <div className="font-medium">
                                        <p>{format(new Date(day.date *1000),"EEE,MMM d")}</p>
                                        <p className='text-muted-foreground text-sm capitalize'>{day.weather.description}</p>
                                    </div>
                                    <div className="flex justify-center gap-4">
                                            <span className='flex items-center text-blue-500'>
                                            <ArrowDown className='mr-1 h-4 w-4 '/>
                                            {formatTemp(day.temp_min)}
                                            </span>
                                            
                                            <span className='flex items-center text-red-500'>
                                                    <ArrowUp className='mr-1 h-4 w-4'/>
                                            </span>

                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <Droplets className='h-4 w-4 text-blue-500'/>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-sm text-muted-foreground">{day.humidity}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Wind className='h-4 w-4 text-blue-500'/>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Wind speed</p>
                        <p className="text-sm text-muted-foreground">{day.wind}%</p>
                    </div>
                </div>
            </div>
                                    </div>
                    })
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default WeatherForcast
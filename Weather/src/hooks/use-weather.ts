import { Cordinates } from "@/API/types";
import { weatherAPI } from "@/API/weather";
import { useQuery } from "@tanstack/react-query";



export const WEATHER_KEY={
    weather :(coords: Cordinates)=>["weather",coords] as const,
    forecast:(coords: Cordinates)=>["forecast",coords] as const,
    location:(coords: Cordinates)=>["location",coords] as const

} as const
export  function useWeatherQuery(coordinates:Cordinates|null){
   return useQuery({
        queryKey:WEATHER_KEY.weather(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates ? weatherAPI.getCurrentWeather(coordinates):null,enabled:!!coordinates,
    })
}

export  function useForecastQuery(coordinates:Cordinates|null){
    return useQuery({
         queryKey:WEATHER_KEY.forecast(coordinates ?? {lat:0,lon:0}),
         queryFn:()=>coordinates ? weatherAPI.getForcast(coordinates):null,enabled:!!coordinates,
     })
 }
 
 export  function useReverseGeoCode(coordinates:Cordinates|null){
    return useQuery({
         queryKey:WEATHER_KEY.location(coordinates ?? {lat:0,lon:0}),
         queryFn:()=>coordinates ? weatherAPI.getGeocode(coordinates):null,enabled:!!coordinates,
     })
 }

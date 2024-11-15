import React from 'react'
import type { WeatherData } from '@/API/types'
import {format} from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
interface WeatherDetailsProps{
    data:WeatherData
}
const WeatherDetails = ({data}:WeatherDetailsProps) => {
    const {wind,main,sys} = data;
    const getWindDirection=(degree:number)=>
    {
        const direction =["N","NE","E","SE","S","SW","W","NW"];
        const normalizeDegree = ((degree % 360) + 360) % 360;
        const index = Math.floor(normalizeDegree / 45) % 8;
        return direction[index]
            }
    function formatTime(timestamp: number) {
       
        return format(new Date(timestamp*1000),"h:mm a")
    }
    
    const details =[
{
    title:"Sunrise",
    value: formatTime(sys.sunrise),
    icon: Sunrise,
    color:"text-orange-500"
}   ,
{
    title:"Sunset",
    value: formatTime(sys.sunset),
    icon: Sunset,
    color:"text-blue-500"
}   ,
{
    title:"wind direction",
    value: `${getWindDirection(wind.deg)}(${wind.deg})`,
    icon: Compass,
    color:"text-blue-500"
}   ,
{
    title:"Pressure",
    value: `${main.pressure} hPa    `,
    icon: Gauge,
    color:"text-blue-500"
}   ,
    ]
  return (
    <Card>
        <CardHeader>
        <CardTitle>
                Weather Details
        </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
                {
                    details.map((data)=>{
                        return <div key={data.title} className="flex items-center gap-3 rounded-lg border p-4">
                            <data.icon className={`${`h-5 w-5 ${data.color}`}`}/>
                            <div className="text-sm font-medium leading-none">
                                <p>
                                    {data.title}
                                
                                </p>
                                <p className='text-sm text-muted-foreground'>{data.value}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </CardContent>
        
    </Card>
  )
}

export default WeatherDetails


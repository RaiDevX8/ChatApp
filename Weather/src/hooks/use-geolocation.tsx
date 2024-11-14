import type { Cordinates } from "@/API/types";
import { useEffect, useState } from "react";

interface GeolocationState{
    coordinates: Cordinates | null;
    error : string | null;
    isLoading : boolean;
}

export function useGeoLocation()
{
    const [locationData, setlocationData] = useState<GeolocationState>({
        coordinates:null,
        error:null,
        isLoading:true,
    })

    const getlocation=()=>{
        setlocationData((prev)=>
        {
            return{
                ...prev,
                isLoading:true,
                error:null
            }
        })
        if(!navigator.geolocation){
            setlocationData({
                coordinates:null,
                error:"accept the permission",
                isLoading:false
            })
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setlocationData({
                coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude
                },
                error:null,
                isLoading:false
            })
        },(error)=>
        {
            let errorMessage:string
            alert('something is wrong')
            setlocationData({
                coordinates:null,
                error:null,
                isLoading:false
            })
        })
    }

    useEffect(()=>
    {
        getlocation();
    },[])

    return{
        ...locationData,
        getlocation
    }
}
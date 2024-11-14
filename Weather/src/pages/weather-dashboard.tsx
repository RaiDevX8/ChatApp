import WeatherSkeleton from "@/components/LocationLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeoLocation } from "@/hooks/use-geolocation"
import { MapPin, RefreshCw } from "lucide-react"

const Weatherdashboard = () => {

  const{isLoading : Locationloading,coordinates,error : locationError ,getlocation}=useGeoLocation();

  console.log(coordinates)

  const handleRefresh=()=>
  {
    getlocation();
    if(coordinates){
      //reload

    }
  }

  if(Locationloading)
  {
    return <WeatherSkeleton/>
  }
  if(locationError){
   return <Alert>
  <AlertTitle>Heads up! Location error</AlertTitle>
  <AlertDescription>
<p>{locationError}</p>
<Button onClick={getlocation} variant={"outline"} className="w-fit">
  <MapPin className="mr-2 h-4 w-4"/>
  Enable Location
</Button>
  </AlertDescription>
</Alert>

  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
        <RefreshCw className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  )
}

export default Weatherdashboard
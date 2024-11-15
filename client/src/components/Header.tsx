import { MapPin, Moon, Pointer, Sun } from "lucide-react";
import { useTheme } from "./theme-provider"
import { Link } from "react-router-dom"
import logo from "@/assets/logo.png"
import CitySearch from "./CitySearch";
import { useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { useGeoLocation } from "@/hooks/use-geolocation";
const Header = () => {
  const {theme,setTheme}=useTheme();
  const { isLoading: locationLoading, coordinates, error: locationError, getlocation } = useGeoLocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  weatherQuery.refetch();

  locationQuery.refetch();

  const isDark = theme==="dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
          
          <Link to={"/"}>
                <img src={logo} alt="logo"  className="h-36 w-36 "/>
          </Link>
          <h1 className="text-sm mr-4 font-bold flex items-center ">
          <MapPin className=" " /> 
          {locationQuery?.data ? `${locationQuery.data[0].name}` : ""}
        </h1>
          <div className="flex gap-4">
            {/* {serach} */}
            < CitySearch/>
            {/* {toggle} */}
            <div className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark? `rotate-180`:`rotate-0`}`} onClick={()=>setTheme(isDark?'light':'dark')}>
              {isDark?
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>
              :
              <Moon className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>}
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header
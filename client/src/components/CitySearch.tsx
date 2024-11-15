import  { useState } from 'react'
import { Button } from './ui/button'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  
  } from "@/components/ui/command"
import { useLocationSearch } from '@/hooks/use-weather';
import {  Loader2, Search, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use-search-hist';
  
const CitySearch = () => {

    const[open,setOpen]=useState(false);
    const[query,setQuery]=useState("");
    const navigate = useNavigate();
       const{ data:location , isLoading }= useLocationSearch(query)
        const {history,clearHistory,addToHistory}= useSearchHistory();


    //add to history
    

      const handelselect=(city:string)=>
      {
            const [lat , lon , name,country]=city.split("|");

            addToHistory.mutate({
                query,
                name,
                lat:parseFloat(lat),
                lon:parseFloat(lon),
                country
            })
            navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
            setOpen(false)
        }
  return (
    <>  
     <Button
    variant={"outline"}
    className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
     onClick={()=>setOpen(true) }>
        search cities..</Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="search cities..." value={query} onValueChange={setQuery}/>
                <CommandList>
                    {query.length>2 && !isLoading && (
                     <CommandEmpty>No Cities Found.</CommandEmpty>

                    )}
           
            {/* <CommandGroup heading="fovorites">
                 <CommandItem>Calendar</CommandItem>
                 <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
            </CommandGroup> */}


          { history.length >0&& <>
            <CommandSeparator/>
          
            <CommandGroup >
                 <div className="">
                    <p>
                        Recent searches
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            onClick={()=>clearHistory.mutate()}
                        >
                            <XCircle className='h-4 w-4'/>
                            Clear
                        </Button>
                    </p>
                 </div>
                 {history.map((location)=>
                {
                    return(
                        <CommandItem key={`${location.lat}-${location.lon}`}
                       value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                       onSelect={(e)=>handelselect(e)}>
                        <XCircle className="r-2 h-4 w-4"/>
                       <span > {location.name}</span>
                       <span className='text-sm text-muted-foreground'>{location.state}</span>
                       <span className='text-sm text-muted-foreground'>{location.country}</span>
                       </CommandItem>
                    )
                })}
            </CommandGroup>
          </>}


            <CommandSeparator/>
            {location && location.length>0 && (
                <CommandGroup heading="suggesions">
                 
                 {isLoading &&(
                    <div className="flex items-center justify-center p-4">
                    <Loader2 className='h-4 w-4 animate-spin'/>
                    </div>
                 )}
                 {
                    location.map((location)=>{
                       return (<CommandItem key={`${location.lat}-${location.lon}`}
                       value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                       onSelect={(e)=>handelselect(e)}>
                        <Search className="r-2 h-4 w-4"/>
                       <span > {location.name}</span>
                       <span className='text-sm text-muted-foreground'>{location.state}</span>
                       <span className='text-sm text-muted-foreground'>{location.country}</span>
                       </CommandItem>)

                    })
                 }
            </CommandGroup>)}
                </CommandList>
   </CommandDialog></>
    
  )
}

export default CitySearch
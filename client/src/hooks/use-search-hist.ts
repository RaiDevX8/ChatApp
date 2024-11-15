import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local";
import { Search } from "lucide-react";

interface types{
    id:string;
    query:string;
    lat:number;
    lon:number;
    name:string;
    country:string;
    state?:string;
    searchAt:number;
}
export function useSearchHistory(){
   const [data,setdata] =useLocalStorage<types[]>("search-hist",[])
const queryclient = useQueryClient();
const historyQuery =useQuery({
    queryKey:["search-hist"],
    queryFn:()=>data,
    initialData:data
   })

   const addToHistory= useMutation({
    mutationFn:async(search:Omit<types,"id" |"searchAt">)=>{
            const newSearch:types={
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchAt:Date.now(),
            }

            const filterdHistory = data.filter(item=>!(item.lat === search.lat && item.lon === search.lon))
            const newHistory = [newSearch,...filterdHistory].slice(0,10);

            setdata(newHistory);
            return newHistory;
    },
    onSuccess:(newHistory)=>{
queryclient.setQueryData(["search-hist"],newHistory)
    }
   })

   const clearHistory = useMutation({
    mutationFn:async()=>{
        setdata([])
        return [];
    },
    onSuccess:()=>{
        queryclient.setQueryData(["search-hist"],[])
    }
   })
   return{
    history: historyQuery.data??[],
    addToHistory,
    clearHistory
   }
}
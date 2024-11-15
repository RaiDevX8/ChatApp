import { useEffect, useState } from "react"

export function useLocalStorage<T>(key:string,initial:T){
   const[store,setStore]= useState<T>(()=>{
            try {
                const item = window.localStorage.getItem(key);
                    return item ? JSON.parse(item):initial;
                } catch (error) {
                console.log(error)
                return initial
            }
   })

   useEffect(() => {
     try {
     window.localStorage.setItem(key,JSON.stringify(store));
        } catch (error) {
        console.log(error)
    }
   }, [key,store])
   return [store,setStore] as const
}
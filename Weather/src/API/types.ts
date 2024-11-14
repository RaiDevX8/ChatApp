export interface Cordinates{
    lat:number;
    lon:number;
}

export interface WeatherCondition{
    id:number;
    main:string;
    description:string;
    icon:string;
}

export interface WeatherData{
    coord:Cordinates;
    weather:WeatherCondition[];
    main:{
        temp:number;
        feels
    }
}
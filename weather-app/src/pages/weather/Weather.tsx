import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/userStorelocation";

const APIKEY = import.meta.env.VITE_API_KEY;
const Weather = () => {
    const userPosition = useUserLocationStore((state:any) => state.userLocation);
    const [weather, setWeather] :any = useState(null);
    const [unit, setUnit] :any = useState('metric');
    function toggleUnit(){
    if (unit === 'metric'){
        setUnit('imperial');
        console.log(unit);
    } else{
        setUnit('metric');
        console.log(unit);
    }
}

    const getWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unit}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setWeather(result);

    }

    useEffect(() => {
        getWeather();
       
    }, [unit]);
    
    return  (  
    <>
    <button  onClick={toggleUnit}>Change temp Unit</button>

        {weather && (
            <>
                <h2>
                    {weather.city.name} -- {weather.city.country}
                </h2>
                {weather.list.map((element:any) => {
                    const date = new Date((element.dt + weather.city.timezone)*1000)
                    return <p key={element.dt}>Date: {date.toUTCString()} <br></br> 
                    Temp: {element.main.temp} <br></br> 
                    {element.weather[0].description} <br></br>
                    </p>
                })}
            </>
        )}
    </>
    );
        
};


export default Weather;
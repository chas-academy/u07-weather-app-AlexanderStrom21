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

        {weather && (
            <>
                <h2>
                    {weather.city.name} -- {weather.city.country}
                </h2>
                <button  onClick={toggleUnit}>Change temp Unit</button>

                {weather.list.map((element:any) => {
                    const date = new Date((element.dt + weather.city.timezone)*1000)
                    const sunset = new Date((weather.city.sunset + weather.city.timezone)*1000)
                    const sunrise = new Date((weather.city.sunrise + weather.city.timezone)*1000)
                    const sunriseResult = [sunrise.getUTCHours(), ":",  sunrise.getMinutes(), ":", sunrise.getSeconds()]
                    const sunsetResult = [sunset.getUTCHours(), ":",  sunset.getMinutes(), ":", sunset.getSeconds()]


                    return <div key={element.dt}>
                        <p> Date: {date.toUTCString()}          </p>
                        <p> Temp: {element.main.temp}           </p>
                        <p> Humidity: {element.main.humidity}%  </p>
                        <p> Wind: {element.wind.speed} m/s      </p>
                        <p> {element.weather[0].description}    </p>
                        <p> Sunrise: {sunriseResult} GMT        </p>
                        <p> Sunset: {sunsetResult} GMT          </p>
                        <br />
                    </div>
                })}
            </>
        )}
    </>
    );
        
};


export default Weather;
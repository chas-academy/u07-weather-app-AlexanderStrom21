import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/userStorelocation";
import { list } from "postcss";

const APIKEY = import.meta.env.VITE_API_KEY;
const Weather = () => {
    const userPosition = useUserLocationStore((state:any) => state.userLocation);
    const [weatherOne, setWeatherOne] :any = useState(null);
    const [weather, setWeather] :any = useState(null);
    const [unit, setUnit] :any = useState('metric');
    
    function toggleUnit(){
    if (unit === 'metric'){
        setUnit('imperial');

    } else{
        setUnit('metric');
    }
}
    function toggleMetric(){
        if(unit === 'metric'){
            return "°C";
        }else
        return "°F";
    }
  
    const getWeatherOne = async () => {
        const urlOne = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unit}`
        const response = await fetch(urlOne);
        const result = await response.json();
        console.log(result);
        setWeatherOne(result);
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
        getWeatherOne();
    }, [unit]);
    
    return  (  
    <>
        {weatherOne && (
            <>
             {weatherOne.weather.map((element:any) => {
                let weatherInfo = element.weather.description;

                return <div className="flex justify-center">
                    <div key={element.dt} className="felx text-gray-300 bg-gray-900 m-5 p-5 w-10/12 rounded-lg">
                        <p> Temp: {element.main.temp} {toggleMetric()}           </p>
                        <p> Humidity: {element.main.humidity}%  </p>
                        <p> Wind: {element.wind.speed} m/s      </p>
                        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={element.weather[0].main} />
                        <p> {weatherInfo}                       </p>

                    </div>
            
                </div>
                })}
            </>
        )}
        {weather &&  (
            <>
            
                <h1 className="flex justify-center text-2xl font-medium p-5 text-gray-300">
                    {weather.city.name} -- {weather.city.country}
                </h1>
                <div className="flex justify-center">
                <div className="flex justify-center bg-gray-900 text-gray-300 w-fit p-3 rounded-lg">
                <button onClick={toggleUnit}>Change temp from {unit}</button>
                </div>
                </div>
                {weather.list.map((element:any) => {
                    const date = new Date((element.dt + weather.city.timezone)*1000)
                    const sunset = new Date((weather.city.sunset + weather.city.timezone)*1000)
                    const sunrise = new Date((weather.city.sunrise + weather.city.timezone)*1000)
                    const sunriseResult = ["0", sunrise.getUTCHours(), " ", ":", " ",   sunrise.getMinutes(),]
                    const sunsetResult = [sunset.getUTCHours(), " ", ":", " ", "0", sunset.getMinutes()]

                    let weatherInfo = element.weather[0].description;
                    let weatherIcon = element.weather[0].icon;
    
                    return<div className="flex justify-center">
                    <div key={element.dt} className="felx text-gray-300 bg-gray-900 m-5 p-5 w-10/12 rounded-lg">
                        <p> Date: {date.toLocaleDateString()}          </p>
                        <p> Temp: {element.main.temp} {toggleMetric()}           </p>
                        <p> Humidity: {element.main.humidity}%  </p>
                        <p> Wind: {element.wind.speed} m/s      </p>
                        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={element.weather[0].main} />
                        <p> {weatherInfo}                       </p>
                        <p> Sunrise: {sunriseResult}         </p>
                        <p> Sunset: {sunsetResult}           </p>
                        <br />
                    </div>
                </div>
                })}
            </>
        )}
    </>
    );
        
};


export default Weather;
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/userStorelocation";
import GeolocationComponent from "../geolocation/GeolocationComponent";
import ImageCloud from "../../assets/pictures/iso-republic-puffy-clouds.jpg";
import ImageRain from "../../assets/pictures/iso-republic-water-droplets-on-glass-window.jpg";
import ImageSnow from "../../assets/pictures/thomas-griesbeck-FytijU4pB_w-unsplash.jpg";

const APIKEY = import.meta.env.VITE_API_KEY;
const Weather = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weatherOne, setWeatherOne]: any = useState(null);
  const [weather, setWeather]: any = useState(null);
  const [unit, setUnit]: any = useState("metric");

  function toggleUnit() {
    if (unit === "metric") {
      setUnit("imperial");
    } else {
      setUnit("metric");
    }
  }
  function toggleMetric() {
    if (unit === "metric") {
      return "°C";
    } else return "°F";
  }

  const getWeatherOne = async () => {
    const urlOne = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unit}`;
    const response = await fetch(urlOne);
    const result = await response.json();
    console.log(result);
    setWeatherOne(result);
  };
  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unit}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    setWeather(result);
  };
  useEffect(() => {
    getWeather();
    getWeatherOne();
  }, [unit, userPosition]);

  return (
    <>
      <GeolocationComponent />
      {weather && (
        <>
          {weatherOne.weather.map((element: any) => {
            const date = new Date((weatherOne.dt + weatherOne.timezone) * 1000);
            const formatTime = (time: number) =>
              time < 10 ? "0" + time : time.toString();
            const sunset = new Date(
              (weatherOne.sys.sunset + weatherOne.timezone) * 1000
            );
            const sunrise = new Date(
              (weatherOne.sys.sunrise + weatherOne.timezone) * 1000
            );
            const sunriseHours = formatTime(sunrise.getHours());
            const sunriseMinutes = formatTime(sunrise.getMinutes());
            const sunsetHours = formatTime(sunset.getUTCHours());
            const sunsetMinutes = formatTime(sunset.getMinutes());

            let weatherIcon = element.icon;

            let backgroundImagePic = element.main;

            if (backgroundImagePic === "Clouds") {
              backgroundImagePic = ImageCloud;
            }
            if (backgroundImagePic === "Rain") {
              backgroundImagePic = ImageRain;
            }
            if (backgroundImagePic === "Snow") {
              backgroundImagePic = ImageSnow;
            }

            return (
              <div
                key={element.dt}
                className="flex justify-center items-center"
              >
                <div
                  style={{
                    backgroundImage: `url(${backgroundImagePic})`,
                    backgroundSize: "cover",
                    borderRadius: "0.5rem",
                  }}
                  className="text-gray-300 bg-gray-900 m-5 w-full rounded-lg md:bg-bottom md:bg-center"
                >
                  <div className="bg-gray-800/50 rounded-lg">
                    <p className="bg-gray-800/50 flex p-2 rounded-lg">
                      {" "}
                      {weather.city.name}, {weather.city.country} --{" "}
                      {date.toLocaleDateString()}{" "}
                    </p>
                    <p className="text-4xl p-5 font-bold">
                      {" "}
                      {weatherOne.main.temp} {toggleMetric()}{" "}
                    </p>
                    <div className="flex justify-end">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                        alt={element.icon}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center text-gray-300 bg-gray-900 m-5 rounded-lg flex-col p-5">
                  <div className="flex flex-col ">
                    <p>feels Like:</p>
                    <p className="text-3xl font-bold flex">
                      {weatherOne.main.feels_like}
                      {toggleMetric()}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between pt-5">
                    <div className="">
                      <p className=""> Wind: {weatherOne.wind.speed}m/s</p>
                      <p className=" ">
                        {" "}
                        Humidity: {weatherOne.main.humidity}%{" "}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        {" "}
                        Sunrise: {sunriseHours}:{sunriseMinutes}{" "}
                      </p>
                      <p>
                        {" "}
                        Sunset: {sunsetHours}:{sunsetMinutes}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      {weather && (
        <>
          <div className="flex justify-center">
            <div className="flex justify-center bg-gray-900 text-gray-300 w-fit p-3 rounded-lg">
              <button onClick={toggleUnit}>Change temp from {unit}</button>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5">
            {weather.list.slice(0, 5).map((element: any) => {
              const date = new Date(
                (element.dt + weather.city.timezone) * 1000
              );
              const formatTime = (time: number) =>
                time < 10 ? "0" + time : time.toString();
              const dateSpecific = date.toLocaleDateString();
              const dateHours = formatTime(date.getHours());
              const dateMinutes = formatTime(date.getMinutes());
              let weatherIcon = element.weather[0].icon;
              return (
                <div className="flex justify-center" key={element.dt}>
                  <div className="flex justify-evenly">
                    <div className="bg-gray-900 text-gray-300 m-0.5 rounded-lg">
                      <div className="bg-gray-800/50 p-2 rounded-t-lg">
                        <p className="text-center">Date: {dateSpecific} </p>
                      </div>
                      <div className="p-5">
                        <p className="text-center">
                          {" "}
                          Date: {dateHours}:{dateMinutes}{" "}
                        </p>
                        <p className="text-center">
                          {" "}
                          Temp: {element.main.temp} {toggleMetric()}{" "}
                        </p>
                        <img
                          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                          alt={element.weather[0].main}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {weather && (
        <>
          <h1 className="flex justify-center text-2xl font-medium p-5 text-gray-300">
            {weather.city.name} -- {weather.city.country}
          </h1>

          {weather.list.map((element: any) => {
            const date = new Date((element.dt + weather.city.timezone) * 1000);
            const formatTime = (time: number) =>
              time < 10 ? "0" + time : time.toString();
            const dateSpecific = date.toLocaleDateString();
            const dateHours = formatTime(date.getHours());
            const dateMinutes = formatTime(date.getMinutes());

            let weatherIcon = element.weather[0].icon;
            // let backgroundImagePic = element.weather[0].main;

            //  if (backgroundImagePic === 'Clouds'){
            //      backgroundImagePic = ImageCloud
            //  }
            //  if(backgroundImagePic === 'Rain'){
            //      backgroundImagePic = ImageRain
            //  }

            return (
              <div key={element.dt} className="flex justify-center ">
                <div className="flex flex-col justify-center items-center text-gray-300 bg-gray-900 m-5 rounded-lg w-9/12">
                  <div className="bg-gray-800/50 flex p-2 rounded-lg w-fit">
                    <p className="">Date: {dateSpecific} </p>
                  </div>
                  <div className="flex justify-center items-center p-5">
                    <p className=" pr-5">
                      {" "}
                      Time: {dateHours}:{dateMinutes}{" "}
                    </p>
                    <p className="pr-5">
                      {" "}
                      Temp: {element.main.temp} {toggleMetric()}{" "}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                      alt={element.weather[0].main}
                    />
                    <br />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Weather;

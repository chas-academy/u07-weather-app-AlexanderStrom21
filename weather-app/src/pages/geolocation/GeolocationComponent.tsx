import { useState } from "react";

const GeolocationComponent = () =>{
    const [userPosition, setUserPosition] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [status, setStatus]: any = useState(null)

    const getLocation = () => {
        if(!navigator.geolocation){
            setStatus("Geolocation is not supported by your browser!");
        } else {
            setStatus("Loading");
        }
        navigator.geolocation.getCurrentPosition(
        (position) => {
            setStatus("");
            setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.latitude,
        });
    },
    () => {
        setStatus("Unable to retrive your location")
    }
);
    };

    return (
    <>
        <button onClick={() => getLocation()}>Get location</button>
        <h2>Coordinates</h2>
        {status && <p>{status}</p>}
        {userPosition?.latitude && <p>Latitude: {userPosition?.latitude}</p>}
        {userPosition?.longitude && <p>Longitude: {userPosition?.longitude}</p>}
    </>
    );
};

export default GeolocationComponent;
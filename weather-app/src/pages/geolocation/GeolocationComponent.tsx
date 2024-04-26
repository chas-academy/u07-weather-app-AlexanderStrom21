import { useState } from "react";
import { useUserLocationStore } from "../store/userStorelocation";

const GeolocationComponent = () =>{
    // const [userPosition, setUserPosition] = useState<{
    //     latitude: number;
    //     longitude: number;
    // } | null>(null);
    const userPosition = useUserLocationStore((state:any) => state.userLocation);
    const setUserPosition = useUserLocationStore(
        (state: any) => state.updateUserLocation
    );

    const [status, setStatus]: any = useState(null);

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
            longitude: position.coords.longitude,
        });
    },
    () => {
        setStatus("Unable to retrive your location")
    }
);
    };

    return (
    <>
        <div className="flex justify-center p-5">
        <div className="flex justify-center bg-gray-900 text-gray-300 w-fit p-3 rounded-lg">
        <button onClick={() => getLocation()}>Get location</button>
        </div>
        </div>
     
        <h2>Coordinates</h2>
        {status && <p>{status}</p>}
        {userPosition?.latitude && <p>Latitude: {userPosition?.latitude}</p>}
        {userPosition?.longitude && <p>Longitude: {userPosition?.longitude}</p>}
    </>
    );
};

export default GeolocationComponent;
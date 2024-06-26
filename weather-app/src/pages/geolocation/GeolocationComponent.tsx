import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/userStorelocation";

const GeolocationComponent = () => {
  // const [userPosition, setUserPosition] = useState<{
  //     latitude: number;
  //     longitude: number;
  // } | null>(null);
  // const userPosition = useUserLocationStore((state:any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const [status, setStatus]: any = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
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
        setStatus("Unable to retrive your location");
      }
    );
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
      {status && <p>{status}</p>}
      {/* <h2>your coordinates</h2>
        {userPosition?.latitude && <p>Latitude: {userPosition?.latitude}</p>}
        {userPosition?.longitude && <p>Longitude: {userPosition?.longitude}</p>} */}
    </>
  );
};

export default GeolocationComponent;

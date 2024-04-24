import { setISODay } from "date-fns";
import React from "react";
import { useState } from "react";
export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    console.log("hook working")
      if (!navigator.geolocation) {
         console.log("your beowser does not support geoLocation");
    }else{
      console.log("geo exist")
      setIsLoading(true);
  
      navigator.geolocation.getCurrentPosition(
       (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
         }),
           setIsLoading(false);
        console.log("loc");
      },
      (error) => {
        setError(error.message), setIsLoading(true);
        console.log(error)
      }
    );
    }
   
  
  }
  return { isLoading, error, position, getPosition };
}

import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
const hotelContext = createContext();
const HotelProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000/hotels/";
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCH, setIsloadingCH] = useState(true);
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data } = useFetch(
    BASE_URL,
    `host_location_like=${destination || ""}&name_like=${
      destination || ""
    } &accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    console.log("attachted")
    setIsloadingCH(true);
    try {
      const { data } = await axios.get(`${BASE_URL}${id}`);
      setCurrentHotel(data);
      setIsloadingCH(false);
    } catch (error) {
      toast(error.messsage);
      setIsloadingCH(false);
    }
  }

  return (
    <hotelContext.Provider
      value={{ isLoading, data, getHotel, isLoadingCH, currentHotel }}
    >
      {children}
    </hotelContext.Provider>
  );
};

export default HotelProvider;
export function useHotels() {
  return useContext(hotelContext);
}

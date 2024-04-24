import { roundToNearestMinutes } from "date-fns";
import React from "react";
import { useParams } from "react-router-dom";
import { useHotels } from "./Context/HotelProvider";
import useFetch from "./useFetch";
import { useEffect } from "react";

function SingleHotel() {

  const { id } = useParams();
  console.log(id);

  const {getHotel,isLoadingCH,currentHotel}=useHotels();

  useEffect(()=>{
    getHotel(id);
  },[id])
  console.log(currentHotel);
  return(
    isLoadingCH ?(<p>loading </p>):(
  
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    )
  )
 
  
}
export default SingleHotel;

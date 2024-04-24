import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import useLocationUrl from "../useLocationUrl";
import { useBookmark } from "../Context/BookmarkProvider";

const BASE_GEOLOCATION_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useLocationUrl();
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(false);
  const navigate = useNavigate();
  const {createBookmark}=useBookmark()


  useEffect(() => {
    async function fetchLocationData() {
      try {
        const { data } = await axios.get(
          `${BASE_GEOLOCATION_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error("this location is not a country");
        console.log(data);
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        setGeoCodingError(false)

      } catch (error) {
        console.log(error.message);
      } finally {
        setGeoCodingError(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const submitHandler=async(e)=> {
    e.preventDefault();
    if(!cityName || !country ) return;
    const newBookmark={
      cityName,
      country,
      countryCode,
      latitude:lat,
      longitude:lng,
      host_location:cityName + " " + country,
    };
    await createBookmark(newBookmark);
     navigate("/bookmark");
  }

  if (geoCodingError) return <p>this location is not a country</p>
  return (

    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="cityName">city name</label>
          <input type={"text"} name="cityName" id="cityName" value={cityName} onChange={(e)=>setCityName(e.target.value)} />
        </div>
        <div className="formControl">
          <label htmlFor="country">country {<ReactCountryFlag svg countryCode={countryCode}/>}</label>
          <input type={"text"} name="country" id="country" value={country} onChange={(e)=>setCountry(e.target.value)} />
          
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className={"btn btn--primary"} type={"submit"}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;

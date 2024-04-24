import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";


function SingleBookmark() {
  const { id } = useParams();
  const { isLoading, getBookmark, currentBookmark } = useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <div>Loading ...</div>;
  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
      <div key={currentBookmark.id} className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;

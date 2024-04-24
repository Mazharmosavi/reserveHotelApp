import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkProvider";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function BookmarksList() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  async function deleteHandler(e, id) {
    console.log(id);
    e.preventDefault();
    await deleteBookmark(id);
  }
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <h2>Bookmarks list</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div
                key={item.id}
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong>&nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => deleteHandler(e, item.id)}>
                  {<HiTrash className="trash" />}
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarksList;

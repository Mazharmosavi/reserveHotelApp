import { Link, useSearchParams } from "react-router-dom";
import { useHotels } from "./Context/HotelProvider";
import useFetch from "./useFetch";
const Hotels = () => {
  const { isLoading, data, currentHotel } = useHotels();

  if (isLoading) <Loader />;
  return (
    <div className="searchList">
      <h2>Search results {data.length}</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            onClick={console.log("did")}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel?.id ? "current-hotel" : ""
              }`}
              key={item.id}
            >
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_locaiton}</p>
                <p className="name">{item.name}</p>${item.price}&nbsp;
                <span>per night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;

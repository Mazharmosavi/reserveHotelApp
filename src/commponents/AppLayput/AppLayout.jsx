import { render } from "react-dom";
import { Outlet } from "react-router-dom";
import { useHotels } from "../Context/HotelProvider";
import Map from "../Map";
const AppLayout = () => {
  console.log("rendered")
  const {isLoading,data} = useHotels();
  console.log(data)
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map bookmarkLocation={data} />
      </div>
    </div>
  );
};

export default AppLayout;

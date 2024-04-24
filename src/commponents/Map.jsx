import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState } from "react";
import { useHotels } from "./Context/HotelProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useGeoLocation from "./useGeoLocation";
import useLocationUrl from "./useLocationUrl";

const Map = ({bookmarkLocation:data}) => {
const [lat,lng] = useLocationUrl();
  const [mapCenter, setMapCenter] = useState([lat || 50, lng || 2]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition:getPosition,
    error,
  } = useGeoLocation();


  useEffect(() => {
    lat && lng ? setMapCenter([lat, lng]) : setMapCenter([50, 2]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }else{
      console.log(error)
    }
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <SetCenter position={mapCenter} />
        <DetectMap/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
         <button className="getLocation" onClick={()=>getPosition()}>
          {isLoadingPosition ? "...loading" : "use our location"}
        </button>
        {data.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;

export function SetCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectMap(){
  const navigate = useNavigate();
  useMapEvent({
    click:e=>navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
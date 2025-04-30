// src/components/LazyMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const LazyMap = ({ locations }) => {
  return (
    <MapContainer
      center={[20, 96]}
      zoom={5}
      style={{
        height: window.innerWidth >= 1024 ? "600px" : "300px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <Marker key={loc._id} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <div className="text-center">
              <h2 className="font-bold text-gray-800">{loc.name}</h2>
              <p className="text-sm text-gray-600">{loc.description}</p>
              {loc.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_API_URL}${loc.imageUrl}`}
                  alt={loc.name}
                  className="mt-2 w-32 h-24 object-cover mx-auto rounded"
                />
              )}
              <Link
                to={`/edit/${loc._id}`}
                className="text-blue-500 underline block mt-2"
              >
                Edit
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LazyMap;

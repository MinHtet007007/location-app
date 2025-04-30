import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../store/locationSlice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

// Lazy-load the entire map component
const LazyMap = lazy(() => import("../components/LazyMap"));

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMapPage = () => {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading map and locations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Explore Locations
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lazy-loaded map */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden shadow border">
            <Suspense
              fallback={
                <div className="h-[600px] flex items-center justify-center">
                  Loading map...
                </div>
              }
            >
              <LazyMap locations={locations} />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white shadow rounded-xl p-4 space-y-4 overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-semibold text-gray-700">All Locations</h2>
          {locations.length === 0 ? (
            <p className="text-gray-500 text-sm">No locations available.</p>
          ) : (
            locations.map((loc) => (
              <div
                key={loc._id}
                className="flex items-center gap-4 border p-3 rounded-lg hover:shadow transition"
              >
                {loc.imageUrl && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${loc.imageUrl}`}
                    alt={loc.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-md font-bold text-gray-800">{loc.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {loc.description}
                  </p>
                  <Link
                    to={`/edit/${loc._id}`}
                    className="text-blue-500 text-sm mt-1 inline-block hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationMapPage;

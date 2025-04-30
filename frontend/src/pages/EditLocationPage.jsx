// src/pages/EditLocationPage.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const EditLocationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [position, setPosition] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/locations`
        );
        const location = res.data.find((loc) => loc._id === id);
        if (location) {
          setValue("name", location.name);
          setValue("description", location.description);
          setValue("latitude", location.latitude);
          setValue("longitude", location.longitude);
          setValue("image", location.imageUrl);
          setPosition({ lat: location.latitude, lng: location.longitude });
        }
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching
      }
    };

    fetchLocation();
  }, [id, setValue]);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      if (data.image && typeof data.image !== "string") {
        formData.append("image", data.image);
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/locations/${id}`,
        formData
      );
      setSubmitError(null);
      navigate("/map");
    } catch (error) {
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setValue("latitude", lat);
    setValue("longitude", lng);
    setPosition({ lat, lng });
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setValue("latitude", e.latlng.lat);
        setValue("longitude", e.latlng.lng);
      },
    });

    return position === null ? null : (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{ dragend: handleDrag }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600 mt-3">Loading location data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Edit Location
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name
            </label>
            <input
              {...register("name", { required: "Location name is required" })}
              placeholder="e.g., Inle Lake"
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="A short description..."
              rows={4}
              className={`w-full px-4 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg resize-none focus:outline-none focus:ring-2 ${
                errors.description
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <div
              className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("file-input").click()}
            >
              <img
                id="image-preview"
                alt="Preview"
                src={
                  watch("image") && typeof watch("image") === "string"
                    ? process.env.REACT_APP_API_URL + watch("image")
                    : ""
                }
                className={`w-full h-full object-cover rounded-lg ${
                  watch("image") && typeof watch("image") === "string"
                    ? ""
                    : "hidden"
                }`}
              />
              <span
                id="placeholder-text"
                className={`text-gray-500 ${
                  watch("image") && typeof watch("image") === "string"
                    ? "hidden"
                    : ""
                }`}
              >
                Click to upload
              </span>
            </div>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              id="file-input"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setValue("image", e.target.files[0]);
                  const reader = new FileReader();
                  reader.onload = () => {
                    const preview = document.getElementById("image-preview");
                    const placeholder =
                      document.getElementById("placeholder-text");
                    if (preview) {
                      preview.src = reader.result;
                      preview.classList.remove("hidden");
                    }
                    if (placeholder) placeholder.classList.add("hidden");
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="rounded-lg overflow-hidden shadow border">
              <MapContainer
                center={[20, 96]}
                zoom={5}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  {...register("latitude", {
                    required: "Latitude is required",
                  })}
                  readOnly
                  className={`w-full px-4 py-2 border ${
                    errors.latitude ? "border-red-500" : "border-gray-200"
                  } bg-gray-50 rounded-lg`}
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.latitude.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  {...register("longitude", {
                    required: "Longitude is required",
                  })}
                  readOnly
                  className={`w-full px-4 py-2 border ${
                    errors.longitude ? "border-red-500" : "border-gray-200"
                  } bg-gray-50 rounded-lg`}
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Update Location"
            )}
          </button>

          {submitError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditLocationPage;

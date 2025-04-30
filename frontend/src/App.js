import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import LocationFormPage from "./pages/LocationFormPage";
import LocationMapPage from "./pages/LocationMapPage";
import EditLocationPage from "./pages/EditLocationPage";
import LoginPage from "./pages/LoginPage";
import RouteGuard from "./pages/RouteGuard";

function App() {
  return (
    <Router>
      <nav className="bg-white shadow-md border-b py-4 px-6 flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Link to={"/"} className="text-xl font-bold text-blue-600">
            Location
          </Link>
          <div className="flex items-center gap-6 text-gray-700 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? "text-blue-600 font-bold border-b-2" : ""
                }`
              }
            >
              Form
            </NavLink>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                `hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? "text-blue-600 font-bold border-b-2" : ""
                }`
              }
            >
              Map
            </NavLink>
            {!!localStorage.getItem("token") && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <LocationFormPage />
            </RouteGuard>
          }
        />
        <Route
          path="/map"
          element={
            <RouteGuard>
              <LocationMapPage />
            </RouteGuard>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RouteGuard>
              <EditLocationPage />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

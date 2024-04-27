import ReactDOM from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Weather from "./pages/weather/Weather.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div className="flex bg-gray-900 text-gray-300">
          <Link className="p-5" to="/">
            About me
          </Link>{" "}
          <Link className="p-5" to="weather">
            Weather
          </Link>
        </div>
        {/* outlet annvänds för att skriva ut children */}
        <Outlet></Outlet>
      </>
    ),
    children: [
      { path: "/", element: <App></App> },
      { path: "weather", element: <Weather></Weather> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

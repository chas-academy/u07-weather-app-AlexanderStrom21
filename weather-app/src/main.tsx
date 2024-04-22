import ReactDOM from 'react-dom/client'
import App from './pages/app/App.tsx'
import './index.css'
import { Link, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import GeolocationComponent from './pages/geolocation/GeolocationComponent.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <div>
      <h1>Welcome to the website</h1>
      <Link to="about">About</Link> | <Link to="app">App</Link> | <Link to="geolocation">Geolocation</Link>
    </div>
    {/* outlet annvänds för att skriva ut children */}
    <Outlet></Outlet> 
   </>,
   children: [
    { path:"app", element:<App></App>},
    { path:"about", element:<div>About</div>},
    { path:"geolocation", element: <GeolocationComponent></GeolocationComponent>},

   ],
  },
  ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
<RouterProvider router={router} />
);

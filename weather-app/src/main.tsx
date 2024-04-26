import ReactDOM from 'react-dom/client'
import App from './pages/app/App.tsx'
import './index.css'
import { Link, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import GeolocationComponent from './pages/geolocation/GeolocationComponent.tsx'
import Weather from './pages/weather/Weather.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <div className='flex bg-gray-900 text-gray-300'>
      <Link className='p-5' to="about">About</Link>  <Link className='p-5' to="app">App</Link>  <Link className='p-5' to="geolocation">Geolocation</Link>  <Link className='p-5' to="weather">Weather</Link>
    </div>
    {/* outlet annvänds för att skriva ut children */}
    <Outlet></Outlet>   
   </>,
   children: [
    { path:"app", element:<App></App>},
    { path:"about", element:<div>About</div>},
    { path:"geolocation", element: <GeolocationComponent></GeolocationComponent>},
    { path:"weather", element: <Weather></Weather>},

   ],
  },
  ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
<RouterProvider router={router} />
);

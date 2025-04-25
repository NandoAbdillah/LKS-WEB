import { RouterProvider,  createHashRouter } from "react-router-dom"

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivatePage from "./component/PrivatePage";
import RequestConsultation from "./pages/RequestConsultation";
import VaccinationSpot from "./pages/VaccinationSpot";
import RegisterVaccination from "./pages/RegisterVaccination";

const router = createHashRouter([
  {
    path:'/',
    element:<PrivatePage>
              <Dashboard/>
            </PrivatePage>
  },
  {
    path:'/consultation',
    element:<PrivatePage>
              <RequestConsultation/>
            </PrivatePage>
  },
  {
    path:'/spot',
    element:<PrivatePage>
              <VaccinationSpot/>
            </PrivatePage>
  },
  {
    path:'/vaccination/:spotId',
    element:<PrivatePage>
              <RegisterVaccination/>
            </PrivatePage>
  },
  {
    path:'/login',
    element:<Login/>  
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

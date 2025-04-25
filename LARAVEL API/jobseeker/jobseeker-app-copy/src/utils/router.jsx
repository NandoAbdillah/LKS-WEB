import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Dashboard from "../pages/Default/Dashboard";
import RequestDataValidation from "../pages/Default/RequestDataValidation";
import ListJobVacancy from "../pages/Default/ListJobVacancies";
import DetailJobVacancy from "../pages/Default/DetailJobVacancy";
import GuestLayout from "../layouts/GuestLayout";
import Login from "../pages/Auth/Login";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/request",
        element: <RequestDataValidation />,
      },
      {
        path: "/vacancies",
        element: <ListJobVacancy />,
      },
      {
        path: "/vacancies/:id",
        element: <DetailJobVacancy />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element : <Login/>
      },
    ],
  },
]);

export default routers;

import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/Auth/SignIn";
import Signup from "../pages/Auth/SIgnUp";
import Home from "../pages/Default/Home";
import RequestDataValidation from "../pages/Default/RequestDataValidation";
import JobVacancies from "../pages/Default/JobVacancies";
import DetailJobVacancy from "../pages/Default/DetailJobVacancy";
import Guest from "../pages/Auth/Guest";
import Default from "../pages/Default/Default";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "/home",
        element : <Home/>
      },
      {
        path: "/add-request-validation",
        element: <RequestDataValidation />,
      },
      {
        path: "/job-vacancies",
        element: <JobVacancies />,
      },
      {
        path: "/detail-job/:id",
        element: <DetailJobVacancy />,
      },
    ],
  },
  {
    path: "/",
    element: <Guest />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  
]);

export default router;

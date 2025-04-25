import { createBrowserRouter } from "react-router";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import RequestValidation from "../pages/RequestValidation";
import JobVacancies from "../pages/JobVacancies";
import VacancyDetail from "../pages/VacancyDetail";


const routers = createBrowserRouter([
    {
        path : "/",
        element : <DefaultLayout/>,
        children : [
            {
                path : "/",
                element : <Dashboard/>
            },
            {
                path : "/request-validation",
                element : <RequestValidation/>
            },
            {
                path : "/vacancies",
                element : <JobVacancies/>
            },
            {
                path : "/vacancy/:id",
                element : <VacancyDetail/>
            }
        ]
    },
    {
        path : "/login",
        element : <Login/>
    }
]);

export default routers;
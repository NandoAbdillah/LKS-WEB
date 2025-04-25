import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import DataPns from "../pages/DataPns";
import CreatePns from "../pages/CreatePns";
import Mutasi from "../pages/Mutasi";
import CreateMutasi from "../pages/CreateMutasi";
import Permintaan from "../pages/Permintaan";

const router = createBrowserRouter([

    {
        path : "/",
        element : <DefaultLayout/>,
        children : [
            {
                path  : "/",
                element : <Home/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>
            },
            {
                path : "pns",
                element : <DataPns/>
            },
            {
                path : "pns/create",
                element : <CreatePns mode="create"/>
            },
            {
                path : "pns/:id/edit",
                element : <CreatePns mode="edit"/>
            },
            {
                path : "mutasi",
                element: <Mutasi/>
            },
            {
                path : "mutasi/create",
                element : <CreateMutasi mode="create"/>
            },
            {
                path : "permintaan",
                element : <Permintaan/>
            }
        ]
    },
    {
        path : "/",
        element : <GuestLayout/>,
        children : [
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            }
        ]
    },
    
]);

export default router;
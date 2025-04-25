import { createBrowserRouter } from "react-router";
import DefaultLayout from "../layouts/DefaultLayout";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Dashboard";
import DiscoverGames from "../pages/Portals/DiscoverGames";
import AddGames from "../pages/Portals/AddGame";
import ManageGames from "../pages/Portals/ManageGames";
import GameDetail from "../pages/Portals/GameDetail";
import UpdateGame from "../pages/Portals/UpdateGame";
import UserDetail from "../pages/Portals/UserDetail";
import NotFound from "../pages/NotFound";
import Forbidden from "../pages/Forbidden";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/discover',
                element: <DiscoverGames />,
            },
            {
                path: '/add/game',
                element: <AddGames />
            },
            {
                path: '/manage-games',
                element: <ManageGames />
            },
            {
                path: '/game/:slug',
                element: <GameDetail />
            },
            {
                path: '/update/:slug',
                element: <UpdateGame />
            },
            {
                path: '/profile/:username',
                element: <UserDetail />
            }
        ]
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: 'forbidden',
        element: <Forbidden />
    }
]);

export default router;
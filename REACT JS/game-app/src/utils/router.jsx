import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import GuestLayout from "../layouts/GuestLayout";
import AdminIndex from "../pages/Admin/AdminIndex";
import GamingIndex from "../pages/GamingPortal/GamingIndex";
import NotFound from "../pages/NotFound";
import AddUser from "../pages/Admin/AddUser";
import Admins from "../pages/Admin/Admins";
import Users from "../pages/Admin/Users";
import Profile from "../pages/Auth/Profile";
import AddNewGame from "../pages/GamingPortal/AddNewGame";
import DetailGame from "../pages/GamingPortal/DetailGame";
import Discover from "../pages/GamingPortal/Discover";
import ManageGames from "../pages/GamingPortal/ManageGames";
import UpdateGame from "../pages/GamingPortal/UpdateGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <GamingIndex />,
      },
      {
        path: "dashboard",
        element: <AdminIndex />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "profile/:username",
        element: <Profile />,
      },
      {
        path: "add-game",
        element: <AddNewGame />,
      },
      {
        path: "detail-game/:slug",
        element: <DetailGame />,
      },
      {
        path: "discover",
        element : <Discover/>
      },
      {
        path : "manage-games",
        element : <ManageGames/>
      },
      {
        path : "update-game/:slug",
        element : <UpdateGame/>
      },
      
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

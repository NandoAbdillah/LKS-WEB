import { createBrowserRouter } from "react-router-dom";
import Home from "./layouts/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import UserProfile from "./layouts/UserProfile";
import DiscoverGames from "./layouts/DiscoverGames";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import DetailGame from "./components/DetailGame";
import AdminLayout from "./admin/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import AboutUs from "./components/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    //Ini adalah element default (bisa dibuat layout navigasi sederhan), untuk elemen yang nanti berubah ubah mengikuti childern kit tambahkan outlet(elemen bawaan react-router-dom) di dalam App.js
    // elemen berfungsi sebagai Pembungkus sedangkan childern adalah isinya, pembungksunya sama tapi isinya beda beda tergantung route
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/games",
        element: <DiscoverGames />,
      },
      {
        path : '/about-us',
        element : <AboutUs />
      },
      {
        path: "/games/:slug",
        element: <DetailGame />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
]);

export default router;

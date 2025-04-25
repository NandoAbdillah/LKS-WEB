import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Home from "./pages/Home";
import Information from "./pages/Information";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Result from "./pages/Result";
import Voting from "./pages/Voting";
import DPD from "./pages/votings/DPD";
import DPR from "./pages/votings/DPR";
import President from "./pages/votings/President";
import VotingBridge from "./pages/votings/VotingBridge";

const router = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "result",
        element: <Result />,
      },
      {
        path: "information",
        element: <Information />,
      },
      {
        path: "voting",
        element: <Voting />,
      },
    ],
  },
  {
    path: "/vote",
    element: <VotingBridge />,
    children: [
      {
        path: "president",
        element: <President />,
      },
      {
        path: "dpr",
        element: <DPR />,
      },
      {
        path: "dpd",
        element: <DPD />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default router;

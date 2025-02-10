import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Link, Route, RouterProvider } from "./utils/CustomRouter";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Alert from "./components/Alert";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import DiscoverGames from "./pages/DiscoverGames";
import UserProfile from "./pages/UserProfile";

function App() {
  const { notification, user } = useAuth();

  return (
    <>
      <main className="position-relative w-100 min-vh-100 overflow-hidden">
        {/* <ul>
        <li>
          <Link to="/game/gta-v">Game Detail</Link>
        </li>
      </ul> */}
        {user && <Navbar />}

        <Route path="/" component={Home} />
        <Route path="/games" component={DiscoverGames} />
        <Route path="/games/:slug" component={GameDetail} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={UserProfile} />
        <Route path="*" component={() => <h1>404 - Not Found</h1>} />
      </main>

      {notification && (
        <Alert status={notification.type} message={notification.message} />
      )}
    </>
  );
}

export default App;
